import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

interface QueryParams {
  page?: number;
  limit?: number;
  [key: string]: any;
}

const handler: ApiWrapperHandler = async (conn, req) => {
  const { page = 1, limit = 20, ...filters } = req.query as QueryParams;

  if (isNaN(page) || isNaN(limit)) {
    return res.error(400, null, "Invalid page");
  }

  const skip = (page - 1) * limit;

  const activities = await conn.activities.findMany({
    select: {
      id: true,
      name: true,
      matriculation: true,
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          matriculation: true,
        },
      },
      masterminds: true,
      activityWorkflow: {
        orderBy: {
          created_at: "desc",
        },
        take: 1,
      },
      status: true,
    },
    skip,
    take: limit,
    orderBy: {
      created_at: "desc",
    },
  });

  const total = await conn.activities.count();

  if (!activities) {
    return res.error(404, null, "Workflow not found");
  }

  const totalPages = Math.ceil(total / limit);
  const nextPage =
    parseInt(page as any) + 1 > totalPages ? null : parseInt(page as any) + 1;

  return res.success({
    activities,
    nextPage: nextPage,
    page: parseInt(page as any),
    total: totalPages,
  });
};

export default new ApiWrapper(handler).configure({
  name: "ActivitiesRead",
  options: {
    methods: ["GET"],
    route: "activities",
  },
});
