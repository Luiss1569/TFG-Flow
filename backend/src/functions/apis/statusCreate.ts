import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { StringSchema, AnyObject, bool } from "yup";

interface Body {
    name: string;
}

const handler: ApiWrapperHandler = async (conn, req) => {
    const body = req.body as Body;

    const { name } = body;

    const status = await conn.status.create({
        data: {
            name,
        },
    });

    return res.success({
        status,
    });
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        body: schema.object().shape({
            name: schema.string().required(),
        })
    })).configure({
        name: "StatusCreate",
        options: {
            methods: ["POST"],
            route: "status",
        },
    });