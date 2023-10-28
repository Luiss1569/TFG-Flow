import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { getAnsweredFields } from "../../services/formatAnswersForms";

const handler: ApiWrapperHandler = async (conn, req) => {
  const { activity_id } = req.params;

  const activity = await conn.activities.findUnique({
    where: {
      id: activity_id,
    },
    include: {
      status: {
        select: {
          id: true,
          name: true,
        },
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          matriculation: true,
        },
      },
      masterminds: {
        select: {
          assigned_at: true,
          teacher: {
            select: {
              id: true,
              university_degree: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      },
      answers: {
        select: {
          id: true,
          content: true,
          form: {
            select: {
              id: true,
              content: true,
            },
          },
        },
      },
      activityWorkflow: {
        select: {
          id: true,
          workflow: {
            select: {
              id: true,
              status: {
                select: {
                  name: true,
                },
              },
            },
          },
          activityworkflowSteps: {
            orderBy: {
              created_at: "asc",
            },
            where: {
              status: {
                not: "error",
              },
            },
            select: {
              id: true,
              status: true,
              created_at: true,
              step: {
                select: {
                  id: true,
                  name: true,
                  type: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: "asc",
        },
      },
    },
  });

  const answeredFields = getAnsweredFields(
    activity.answers as unknown
  );

  delete activity.answers;

  activity["answered"] = answeredFields;

  if (!activity) {
    return res.error(404, null, "Workflow not found");
  }

  return res.success(activity);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object().shape({
      activity_id: schema.string(),
    }),
  }))
  .configure({
    name: "Activity-Read",
    options: {
      methods: ["GET"],
      route: "activity/{activity_id}",
    },
  });
