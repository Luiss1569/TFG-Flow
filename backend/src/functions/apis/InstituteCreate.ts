import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { StringSchema, AnyObject, bool } from "yup";

interface Body {
    name: string;
    acronym: string;
}

const handler: ApiWrapperHandler = async (conn, req) => {
    const body = req.body as Body;

    const { name, acronym } = body;

    const institute = await conn.institutes.create({
        data: {
            name,
            acronym
        },
    });

    return res.success({
        institute,
    });
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        body: schema.object().shape({
            name: schema.string().required(),
            acronym: schema.string().required(),
        })
    })).configure({
        name: "InstituteCreate",
        options: {
            methods: ["POST"],
            route: "institute",
        },
    });