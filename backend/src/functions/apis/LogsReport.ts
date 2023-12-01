import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { type } from "os";

const handler: ApiWrapperHandler = async (conn, req) => {
  const totalLogs = await conn.logs.count();
  const { days = '7' } = req.params as { days: string };
  const logsReports = await conn.logs.findMany({
    where: {
      created_at: {
        gte: new Date(fromDaysAgo(+days)),
      },
    },
    select: {
      id: true,
      content: true,
      created_at: true,
      user_id: true,
      function: true,
    },
  });

  const usersId = logsReports.map((log) => log.user_id);

  const users = await conn.users.findMany({
    where: {
      id: {
        in: usersId,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const usersMap = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as { [key: string]: any });

  return res.success({
    totalLogs,
    logsReports,
    usersMap,
  });
};

export default new ApiWrapper(handler).configure({
  name: "LogsReportCount",
  options: {
    methods: ["GET"],
    route: "report/logsReport/{days?}",
  },
});

const fromDaysAgo = (days: number) => {
  const currentDate = new Date();
  const date = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);
  return date.toISOString().split("T")[0];
};
