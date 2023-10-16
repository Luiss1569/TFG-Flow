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
      where: {
        activity_id: activity.id,
      },
    });

    const answers = await conn.answers.findMany({
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
      const answer = answers.find((a) => a.form_id === r.form_id);
      return {
        ...r,
        answer,
      };
    });

    const result = (() => {
      try {
        return new Function(
          "requestAnswers",
          "activity",
          "answers",
          content.condition
        )(requestAnswersWithAnswers, activity, answers);
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
