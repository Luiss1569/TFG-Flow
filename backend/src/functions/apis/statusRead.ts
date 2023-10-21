import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
    const { status_id } = req.params;

    const status = await conn.status.findMany({
        where: {
            id: status_id ? status_id : undefined,
        }
    });
    if (!status) {
        return res.error(404, null, "Status not found");
    }
    return res.success(status);
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            status_id: schema.string().optional(),
        }),
    }))
    .configure({
        name: "StatusRead",
        options: {
            methods: ["GET"],
            route: "/status/{status_id?}",
        },
    });