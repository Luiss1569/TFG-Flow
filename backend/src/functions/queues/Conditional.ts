import { ConditionalInterface } from "../../interfaces/steps";
import { sendToQueue } from "../../utils/sbus-outputs";
import ApiWrapper, {
  QueueWrapperHandler,
} from "../../utils/wrappers/blockWrapper";

const handler: QueueWrapperHandler = async (conn, messageQueue, context) => {
  const { step_id, workflow, activity_workflow_id, activity } = messageQueue;

  try {
    await conn.$executeRaw`BEGIN;`;

    const step = await conn.steps.findFirstOrThrow({
      where: {
        id: step_id,
      },
    });

    const content = step.content as unknown as ConditionalInterface;

    const requestAnswers = await conn.requestAnswers.findMany({
      select: {
        id: true,
        form_id: true,
        activity_workflow_step: {
          select: {
            id: true,
            step_id: true,
          },
        },
        form: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        activity_id: activity.id,
      },
      orderBy: {
        created_at: "asc",
      },
    });

    const answers = await conn.answers.findMany({
      select: {
        form_id: true,
        content: true,
        id: true,
      },
      where: {
        userRequestAnswers: {
          some: {
            request_answer_id: {
              in: requestAnswers.map((r) => r.id),
            },
          },
        },
      },
    });

    const requestAnswersWithAnswers = requestAnswers.map((r) => {
      const req_answers = answers.filter((a) => a.form_id === r.form_id);
      return {
        ...r,
        answers: req_answers,
      };
    });

    const operations = {
      getReqAnswerByStepId: (step_id: string) => {
        return requestAnswersWithAnswers.filter(
          (r) => r.activity_workflow_step.step_id === step_id
        );
      },
      getActivity() {
        return activity;
      },
    };

    const result = (() => {
      try {
        return new Function("operations", content.condition)(operations);
      } catch (error) {
        context.log("Error on condition: ", error);
        return false;
      }
    })();

    const nextStep = await conn.steps.findFirst({
      where: {
        workflow_id: workflow.id,
        identifier: result ? content.true_step_id : content.false_step_id,
      },
    });

    if (nextStep) {
      sendToQueue(context, nextStep.type, {
        step_id: nextStep.id,
        activity_workflow_id,
      });
    }

    await conn.$executeRaw`COMMIT;`;

    return {
      next_step_id: nextStep?.id,
      result,
    };
  } catch (error) {
    await conn.$executeRaw`ROLLBACK;`;
    throw error;
  }
};

export default new ApiWrapper(handler).configure({
  name: "Conditional",
  options: {
    queueName: "conditional",
  },
});
