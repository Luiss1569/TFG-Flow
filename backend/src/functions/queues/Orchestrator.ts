import { sendToQueue } from "../../utils/sbus-outputs";
import QueueWrapper, {
  QueueWrapperHandler,
} from "../../utils/wrappers/queueWrapper";

interface TMessage {
  answer_id: string;
}

const handler: QueueWrapperHandler<TMessage> = async (
  conn,
  messageQueue,
  context
) => {
  try {
    const { answer_id } = messageQueue;

    await conn.$executeRaw`BEGIN;`;

    const answer = await conn.answers.findFirstOrThrow({
      where: {
        id: answer_id,
      },
      include: {
        form: true,
        activity: true,
      },
    });

    const workflow = await conn.workflows.findFirstOrThrow({
      where: {
        status_id: answer.form.status_id,
      },
    });

    const workflowActivity = await conn.activityWorkflow.create({
      data: {
        workflow: {
          connect: {
            id: workflow.id,
          },
        },
        activity: {
          connect: {
            id: answer.activity.id,
          },
        },
      },
    });

    if (!workflowActivity) {
      throw new Error("Workflow Activity not created");
    }

    const firstStep = await conn.steps.findFirstOrThrow({
      where: {
        identifier: workflow.first_step_id,
        workflow_id: workflow.id,
      },
    });

    sendToQueue(context, firstStep.type, {
      step_id: firstStep.id,
      activity_workflow_id: workflowActivity.id,
    });

    await conn.$executeRaw`COMMIT;`;
  } catch (err) {
    await conn.$executeRaw`ROLLBACK;`;
    throw err;
  }
};

export default new QueueWrapper<TMessage>(handler).configure({
  name: "Orchestrator",
  options: {
    queueName: "orchestrator",
  },
});
