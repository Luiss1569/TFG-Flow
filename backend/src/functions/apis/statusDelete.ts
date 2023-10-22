import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
    const { status_id } = req.params;

    const status = await conn.status.findUnique({
        where: {
            id: status_id 
        }
    });
    if (!status) {
        return res.error(404, null, "Status not found");
    }

    await conn.status.delete({
        where: {
            id: status_id
        }
    });

    return res.success(status);
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            status_id: schema.string().required(),
        }),
    })).configure({
        name: "StatusDelete",
        options: {
            methods: ["DELETE"],
            route: "/status/{status_id}",
        },
    }); 
    