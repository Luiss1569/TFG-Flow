import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
  const publicForms = await conn.forms.findMany({
    where: {
      form_type: "public",
      OR: [
        {
          formOpenPeriod: {
            some: {
              start_date: {
                lte: new Date(),
              },
              end_date: {
                gte: new Date(),
              },
            },
          },
        },
        {
          formOpenPeriod: {
            none: {},
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      status: {
        select: {
          name: true,
        },
      },
    },
  });

  const requestAnswers = await conn.userRequestAnswers.findMany({
    where: {
      user: {
        id: req.user.id,
      },
      answer_id: null,
      request_answer: {
        form: {
          form_type: "private",
          OR: [
            {
              formOpenPeriod: {
                some: {
                  start_date: {
                    lte: new Date(),
                  },
                  end_date: {
                    gte: new Date(),
                  },
                },
              },
            },
            {
              formOpenPeriod: {
                none: {},
              },
            },
          ],
        },
      },
    },
    select: {
      request_answer_id: true,
      request_answer: {
        select: {
          activity: {
            select: {
              id: true,
              name: true,
              matriculation: true,
              created_at: true,
              status: {
                select: {
                  name: true,
                },
              },
            },
          },
          form: {
            select: {
              id: true,
              name: true,
              description: true,
              slug: true,
              formOpenPeriod: {
                select: {
                  start_date: true,
                  end_date: true,
                },
              }
            },
          },
        },
      },
    },
  });

  const activities = await conn.activities.findMany({
    where: {
      user_id: req.user.id,
      masterminds: undefined,
    },
    select: {
      id: true,
      name: true,
      matriculation: true,
      created_at: true,
      status: {
        select: {
          name: true,
        },
      },
      masterminds: {
        select: {
          teacher: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  let teacher_activities = null;
  if (req.user.role === "teacher") {
    const teacher = await conn.teachers.findFirst({
      where: {
        user_id: req.user.id,
      },
    });

    teacher_activities = await conn.activities.findMany({
      where: {
        masterminds: { some: { teacher_id: teacher.id } },
      },
      select: {
        id: true,
        name: true,
        matriculation: true,
        created_at: true,
        status: {
          select: {
            name: true,
          },
        },
        masterminds: {
          select: {
            teacher: {
              select: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  const data = {
    public: publicForms,
    request: requestAnswers,
    activities: activities,
    teacher_activities: teacher_activities,
  };

  return res.success(data);
};

export default new ApiWrapper(handler).configure({
  name: "Dashboard",
  options: {
    methods: ["GET"],
    route: "dashboard",
  },
});
