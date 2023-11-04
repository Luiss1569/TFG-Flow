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
              form_type: true,
              content: true,
            },
          },
        },
        where: {
          form: {
            form_type: "public",
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
              response: true,
              requestAnswers: {
                select: {
                  id: true,
                  userRequestAnswers: {
                    select: {
                      answer_id: true,
                      user: {
                        select: {
                          name: true,
                          email: true,
                        },
                      },
                      answer: {
                        select: {
                          id: true,
                          content: true,
                          form: {
                            select: {
                              id: true,
                              form_type: true,
                              content: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
                where: {
                  userRequestAnswers: {
                    every: {
                      answer_id: {
                        not: null,
                      },
                    },
                  },
                },
              },
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

  const answeredFields = await getAnsweredFields(activity.answers as unknown);
  activity["answered"] = answeredFields;
  delete activity.answers;

  for (const activityWorkflow of activity.activityWorkflow) {
    const activityWorkflowSteps = activityWorkflow.activityworkflowSteps;

    for (const activityWorkflowStep of activityWorkflowSteps) {
      const requestAnswers = activityWorkflowStep.requestAnswers;
      const response = activityWorkflowStep.response as { [key: string]: any };

      if (response?.result?.body) {
        activityWorkflowStep["data"] = response.result.body;
      }

      delete activityWorkflowStep.response;

      if (!requestAnswers) {
        continue;
      }

      for (const requestAnswer of requestAnswers) {
        const userRequestAnswers = requestAnswer.userRequestAnswers;

        for (const userRequestAnswer of userRequestAnswers) {
          const answer = userRequestAnswer.answer;

          delete userRequestAnswer.answer;
          userRequestAnswer["answered"] = await getAnsweredFields([
            answer,
          ] as unknown);
         
        }
      }
    }
  }

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
