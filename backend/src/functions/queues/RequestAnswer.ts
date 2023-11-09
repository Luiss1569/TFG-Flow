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
    const users: Set<string> = new Set([...(content.answers ?? [])]);

    console.log("###############", content.fieldForm);

    if (content.fieldForm?.length) {
      const answers = await conn.answers.findMany({
        where: {
          form: {
            id: {
              in: content.fieldForm.map((field) => field.form_id),
            },
          },
          activity: {
            id: activity.id,
          },
        },
        select: {
          form_id: true,
          content: true,
        },
      });

      content.fieldForm.forEach((field) => {
        const answer = answers.find(
          (answer) => answer.form_id === field.form_id
        );

        if (answer) {
          const value: string[] = answer.content[field.field_id];

          if (value) {
            value.forEach((user) => {
              users.add(user);
            });
          }
        }
      });
    }

    const mapUser = await replaceUsers(conn, activity, [...users]);

    console.log("###############", mapUser);

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
