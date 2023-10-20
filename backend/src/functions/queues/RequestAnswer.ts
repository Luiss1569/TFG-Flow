import { RequestAnswerInterface } from "../../interfaces/steps";
import { replaceUsers } from "../../services/replace";
import QueueWrapper, {
  QueueWrapperHandler,
} from "../../utils/wrappers/blockWrapper";

const handler: QueueWrapperHandler = async (conn, messageQueue, context) => {
  const { step, activity, activity_workflow_step } = messageQueue;

  try {
    await conn.$executeRaw`BEGIN;`;
    const content = step.content as unknown as RequestAnswerInterface;

    const mapUser = await replaceUsers(conn, activity, content.answers);

    const requestAnswer = await conn.requestAnswers.create({
      data: {
        activity_workflow_step: {
          connect: {
            id: activity_workflow_step.id,
          },
        },
        activity: {
          connect: {
            id: activity.id,
          },
        },
        form: {
          connect: {
            id: content.form_id,
          },
        },
      },
    });

    await conn.userRequestAnswers.createMany({
      data: mapUser.map((user) => ({
        user_id: user.id,
        request_answer_id: requestAnswer.id,
      })),
    });

    await conn.$executeRaw`COMMIT;`;

    return {
      request_answer_id: requestAnswer.id,
      requesters: mapUser.map((user) => user.id),
    };
  } catch (error) {
    await conn.$executeRaw`ROLLBACK;`;
    throw error;
  }
};

export default new QueueWrapper(handler).configure({
  name: "RequestAnswer",
  options: {
    queueName: "request_answers",
  },
});
