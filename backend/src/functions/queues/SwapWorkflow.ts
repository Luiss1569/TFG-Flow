import { SwapWorkflowInterface } from "../../interfaces/steps";
import { sendToQueue } from "../../utils/sbus-outputs";
import ApiWrapper, {
  QueueWrapperHandler,
} from "../../utils/wrappers/blockWrapper";

const handler: QueueWrapperHandler = async (conn, messageQueue, context) => {
  try {
    await conn.$executeRaw`BEGIN;`;

    const { activity, step } = messageQueue;

    const content = step.content as unknown as SwapWorkflowInterface;
    let activityWorkflowId = null;

    const nextWorkflow = await conn.workflows.findFirst({
      where: {
        status_id: content.status_id,
      },
    });

    if (nextWorkflow) {
      const workflowActivity = await conn.activityWorkflow.create({
        data: {
          workflow: {
            connect: {
              id: nextWorkflow.id,
            },
          },
          activity: {
            connect: {
              id: activity.id,
            },
          },
        },
      });
      if (!workflowActivity) {
        throw new Error("Workflow Activity not created");
      }

      const firstStep = await conn.steps.findFirstOrThrow({
        where: {
          identifier: nextWorkflow.first_step_id,
          workflow_id: nextWorkflow.id,
        },
      });

      if (firstStep) {
        sendToQueue(context, firstStep.type, {
          step_id: firstStep.id,
          activity_workflow_id: workflowActivity.id,
        });
      }

      activityWorkflowId = workflowActivity.id;
    }

    await conn.activities.update({
      data: {
        status: {
          connect: {
            id: content.status_id,
          },
        },
      },
      where: {
        id: activity.id,
      },
    });

    await conn.$executeRaw`COMMIT;`;

    return {
      workflow_activity_id: activityWorkflowId,
      next_workflow_id: nextWorkflow?.id,
      status_id: content.status_id,
    };
  } catch (error) {
    await conn.$executeRaw`ROLLBACK;`;
    throw error;
  }
};

export default new ApiWrapper(handler).configure({
  name: "SwapWorkflow",
  options: {
    queueName: "swap_workflow",
  },
});
