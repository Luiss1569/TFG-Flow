import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
  const totalActivities = await conn.activities.count();

  const totalActivitiesLast24Hours = await conn.activities.count({
    where: {
      created_at: {
        gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    },
  });

  const activitiesLast7Days: Array<{ date: string; count: number }> =
    await conn.$queryRaw`
  SELECT DATE(created_at) as date, COUNT(id)::integer as count
  FROM activities
  WHERE created_at >= NOW() - INTERVAL '7 days'
  GROUP BY DATE(created_at)
`;

  const activitiesPerStatus = await conn.activities.groupBy({
    by: ["status_id"],
    _count: true,
  });

  const activitiesPerStatusName = await conn.status.findMany({
    where: {
      id: {
        in: activitiesPerStatus.map((status) => status.status_id),
      },
    },
  });

  const activitiesPerStatusNameMap = activitiesPerStatus.map((activStatus) => ({
    count: activStatus._count,
    status: activitiesPerStatusName.find(
      (status) => status.id === activStatus.status_id
    )?.name,
  }));

  // Create a map of the existing dates in activitiesLast7Days
  const existingDatesMap = new Map(
    activitiesLast7Days.map((activity) => [activity.date, activity.count])
  );

  const currentDate = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
    const formattedDate = date.toISOString().split("T")[0];
    if (!existingDatesMap.has(formattedDate)) {
      activitiesLast7Days.push({ date: formattedDate, count: 0 });
    }
  }
  activitiesLast7Days.sort((a, b) => a.date.localeCompare(b.date));
  activitiesLast7Days.forEach((activity) => {
    if (activity.date) {
      activity.date = new Date(activity.date).toLocaleDateString();
    }
  });

  return res.success({
    totalActivities,
    activitiesLast7Days,
    totalActivitiesLast24Hours,
    activitiesPerStatus: activitiesPerStatusNameMap
  });
};

export default new ApiWrapper(handler).configure({
  name: "ActivityReport",
  options: {
    methods: ["GET"],
    route: "report/activity",
  },
});
