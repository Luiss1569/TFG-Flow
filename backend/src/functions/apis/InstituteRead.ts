import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";


const handler: ApiWrapperHandler = async (conn, req) => {
    const { institute_id } = req.params;
    
    const institute = await conn.institutes.findMany({
        where: {
            id: institute_id ? institute_id : undefined,
        }
    });
    if (!institute) {
        return res.error(404, null, "Institute not found");
    }
    return res.success(institute);
};

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            institute_id: schema.string().optional(),
        }),
    }))
    .configure({
        name: "Institute-Read",
        options: {
            methods: ["GET"],
            route: "institute/{institute_id?}",
        },
    });