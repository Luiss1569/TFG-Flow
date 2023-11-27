import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
    const totalLogs = await conn.logs.count();
    
    const totalLogsLast24Hours = await conn.logs.count({
        where: {
        created_at: {
            gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
        },
    });
    
    const logsLast7Days: Array<{ date: string; count: number }> =
        await conn.$queryRaw`
    SELECT DATE(created_at) as date, COUNT(id)::integer as count
    FROM logs
    WHERE created_at >= NOW() - INTERVAL '7 days'
    GROUP BY DATE(created_at)
    `;
    
    
    // Create a map of the existing dates in logsLast7Days
    const existingDatesMap = new Map(
        logsLast7Days.map((log) => [log.date, log.count ])
    );
    
    const currentDate = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
        const formattedDate = date.toISOString().split("T")[0];
        if (!existingDatesMap.has(formattedDate)) {
        logsLast7Days.push({ date: formattedDate, count: 0 });
        }
    }
    logsLast7Days.sort((a, b) => a.date.localeCompare(b.date));
    logsLast7Days.forEach((log) => {
        if (log.date) {
        log.date = new Date(log.date).toLocaleDateString();
        }
    });
    
    return res.success({
        totalLogs,
        totalLogsLast24Hours,
        logsLast7Days,
    });
    }

    export default new ApiWrapper(handler).configure({
        name: "LogsReport",
        options: {
            methods: ["GET"],
            route: "report/logs",
          },
        });
        