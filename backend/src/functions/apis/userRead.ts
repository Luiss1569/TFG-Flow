import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
    const { user_id } = req.params;

    const user = await conn.users.findFirstOrThrow({
        where: {
            id: user_id ? user_id : undefined,
        }
    });
    return res.success(user);
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            user_id: schema.string().optional(),
        }),
    }))
    .configure({
        name: "User-Read",
        options: {
            methods: ["GET"],
            route: "/user/{user_id?}",
        },
    });