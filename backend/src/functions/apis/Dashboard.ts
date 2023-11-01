import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
  const publicForms = await conn.forms.findMany({
    where: {
      form_type: "public",
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
      formOpenPeriod: {
        select: {
          start_date: true,
          end_date: true,
        },
      },
    },
  });

  const requestAnswers = await conn.forms.findMany({
    where: {
      form_type: "private",
      formOpenPeriod: {
        every: {
          start_date: {
            lte: new Date(),
          },
          end_date: {
            gte: new Date(),
          },
        },
      },
      requestAnswers: {
        some: {
          userRequestAnswers: {
            some: {
              user: {
                id: req.user.id,
              },
              answer_id: {
                equals: null,
              },
            },
          },
        },
      },
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
      requestAnswers: {
        select: {
          activity: {
            select: {
              id: true,
              matriculation: true,
              name: true,
            },
          },
        },
      },
      formOpenPeriod: {
        select: {
          start_date: true,
          end_date: true,
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

  let teacher_activities = [];
  if (req.user.role === "teacher") {
    teacher_activities = await conn.activities.findMany({
      where: {
        masterminds: { some: { teacher_id: req.user.id } },
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
