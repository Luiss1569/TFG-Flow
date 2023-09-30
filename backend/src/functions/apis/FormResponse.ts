import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import {
  extraOutputsSwapWorkflow,
  sendToQueue,
} from "../../utils/sbus-outputs";

interface Body {
  content: string;
  activity_id?: string;
}

const handler: ApiWrapperHandler = async (conn, req, context) => {
  const { form_id } = req.params;
  const { content } = req.body as Body;
  let { activity_id } = req.body as Body;
  const user = req.user;
  let request_answer_id: string | null = null;

  const form = await conn.forms.findFirstOrThrow({
    where: {
      id: form_id,
    },
  });

  if (!form) {
    throw new Error("Form not found");
  }

  if (form.form_type === "private" && !activity_id) {
    throw new Error("body.activity_id is required");
  }

  if (form.form_type === "public") {
    const activity = await conn.activities.create({
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    activity_id = activity.id;
  } else {
    const request_answer = await conn.requestAnswers.findFirstOrThrow({
      where: {
        activity_id,
        form_id,
        userRequestAnswers: {
          some: {
            user_id: user.id,
            answer_id: null,
          },
        },
      },
    });

    request_answer_id = request_answer.id;
  }

  const answer = await conn.answers.create({
    data: {
      content: JSON.parse(content),
      user: {
        connect: {
          id: user.id,
        },
      },
      activity: {
        connect: {
          id: activity_id,
        },
      },
      form: {
        connect: {
          id: form_id,
        },
      },
    },
  });

  if (form.form_type === "public") {
    sendToQueue(context, "orchestrator", {
      answer_id: answer.id,
    });
  } else {
    await conn.userRequestAnswers.update({
      where: {
        request_answer_id_user_id: {
          request_answer_id: request_answer_id,
          user_id: user.id,
        },
      },
      data: {
        answer_id: answer.id,
      },
    });
  }

  return res.created(answer);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      content: schema.string().test("is-json", "Invalid JSON", (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
      activity_id: schema.string(),
    }),
  }))
  .configure({
    name: "Form-Response",
    options: {
      methods: ["POST"],
      route: "/form-response/{form_id}",
      extraOutputs: [extraOutputsSwapWorkflow],
    },
  });
