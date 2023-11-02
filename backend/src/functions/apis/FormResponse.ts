import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import sbusOutputs, { sendToQueue } from "../../utils/sbus-outputs";
import { Prisma } from "@prisma/client";
import uploadFileToBlob from "../../services/storageFiles";

interface Content extends Prisma.JsonObject {
  activity_name?: string;
  masterminds?: Array<string>;
}

interface Body {
  content: Content;
  activity_id?: string;
}

const handler: ApiWrapperHandler = async (conn, req, context) => {
  const { form_id } = req.params;
  const { content } = req.body as Body;
  let { activity_id } = req.body as Body;
  const user = req.user;
  let request_answer_id: string | null = null;

  try {
    await conn.$executeRaw`BEGIN;`;
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
      const teachers = await conn.users.findMany({
        where: {
          id: {
            in: content?.masterminds,
          },
        },
        select: {
          teachers: {
            select: {
              id: true,
            },
          },
        },
      });

      const teachersIds = teachers
        .map((teacher) => teacher.teachers.map((teacher) => teacher.id))
        .flat();

      const activity = await conn.activities.create({
        data: {
          name: content?.activity_name,
          users: {
            connect: {
              id: user.id,
            },
          },
          status: {
            connect: {
              id: form.status_id,
            },
          },
          masterminds: {
            createMany: {
              data: teachersIds.map((teacher_id) => ({
                teacher_id: teacher_id,
              })),
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

    for (const cont of Object.keys(content)) {
      const field = content[cont] as any;

      if (typeof field === "object" && field?.file) {
        const uploaded = await uploadFileToBlob(
          user.id,
          field.name,
          field.type,
          field.file
        ).catch((err) => {
          throw err;
        });

        content[cont] = uploaded as any;
      }
    }

    const answer = await conn.answers.create({
      data: {
        content,
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

      const thereAreMoreUsers = await thereAreMoreUsersToAnswer(
        conn,
        request_answer_id
      );

      if (!thereAreMoreUsers) {
        const requestAnswer = await conn.requestAnswers.findFirstOrThrow({
          where: {
            id: request_answer_id,
          },
          include: {
            activity_workflow_step: {
              include: {
                step: true,
              },
            },
          },
        });

        await conn.requestAnswers.update({
          where: {
            id: request_answer_id,
          },
          data: {
            status: "proccess",
          },
        });

        const nextStep = await conn.steps.findFirstOrThrow({
          where: {
            identifier: requestAnswer.activity_workflow_step.step.next_step_id,
            workflow_id: requestAnswer.activity_workflow_step.step.workflow_id,
          },
        });

        sendToQueue(context, nextStep.type, {
          step_id: nextStep.id,
          activity_workflow_id:
            requestAnswer.activity_workflow_step.active_workflow_id,
        });
      }
    }

    await conn.$executeRaw`COMMIT;`;

    return res.created(answer);
  } catch (err) {
    await conn.$executeRaw`ROLLBACK;`;
    throw err;
  }
};

const thereAreMoreUsersToAnswer = async (
  conn: Parameters<ApiWrapperHandler>[0],
  request_answer_id: string
): Promise<boolean> => {
  const users = await conn.userRequestAnswers.findMany({
    where: {
      request_answer_id,
      answer_id: null,
    },
  });
  return users.length > 0;
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      content: schema.object().unknown().required(),
      activity_id: schema.string().uuid().optional(),
    }),
    params: schema.object().shape({
      form_id: schema.string().uuid(),
    }),
  }))
  .configure({
    name: "Form-Response",
    options: {
      methods: ["POST"],
      route: "form/{form_id}/response",
      extraOutputs: sbusOutputs,
    },
  });
