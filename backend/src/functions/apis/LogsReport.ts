import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { type } from "os";

const handler: ApiWrapperHandler = async (conn, req) => {
    const totalLogs = await conn.logs.count();
    const { days } = req.params as { days:  string  };
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
        },
    });

    logsReports.map((log) => {
        [log.created_at, log.content]
    });


    return res.success({
        totalLogs,
        logsReports
    });
}

export default new ApiWrapper(handler).configure({
    name: "Logs-Report-Count",
    options: {
        methods: ["GET"],
        route: "report/logsReport/{days}",
    },
});

const fromDaysAgo = (days: number) => {
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);
    return date.toISOString().split("T")[0];
}