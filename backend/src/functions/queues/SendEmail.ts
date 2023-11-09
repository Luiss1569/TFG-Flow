import { SendEmailInterface } from "../../interfaces/steps";
import { sendEmail } from "../../services/email";
import { replaceUsers } from "../../services/replace";
import { sendToQueue } from "../../utils/sbus-outputs";
import ApiWrapper, {
  QueueWrapperHandler,
} from "../../utils/wrappers/blockWrapper";

const handler: QueueWrapperHandler = async (conn, messageQueue, context) => {
  const { step_id, activity_workflow_id, activity } = messageQueue;

  const step = await conn.steps.findFirstOrThrow({
    where: {
      id: step_id,
    },
  });

  const owner = await conn.users.findFirstOrThrow({
    where: {
      id: activity.user_id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const content = step.content as unknown as SendEmailInterface;

  const mapUser = await replaceUsers(conn, activity, content.to);

  await sendEmail(
    mapUser.map((user) => user.email),
    new Function("activity", "user", "return `" + content.title + "`")(
      activity,
      owner
    ),
    new Function("activity", "user", "return `" + content.body + "`")(
      activity,
      owner
    )
  );

  if (step.next_step_id) {
    const nextStep = await conn.steps.findFirst({
      where: {
        identifier: step.next_step_id,
        workflow_id: step.workflow_id,
      },
    });

    sendToQueue(context, nextStep.type, {
      step_id: nextStep.id,
      activity_workflow_id,
    });
  }

  return {
    send_email: true,
    to: mapUser.map((user) => user.id),
  };
};

export default new ApiWrapper(handler).configure({
  name: "SendEmail",
  options: {
    queueName: "send_email",
  },
});
