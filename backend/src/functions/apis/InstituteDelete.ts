import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
    const { institute_id } = req.params;

    const institute = await conn.institutes.findUnique({
        where: {
            id: institute_id,
        }
    });

    if (!institute) {
        return res.error(404, null, "Institute not found");
    }

    await conn.institutes.delete({
        where: {
            id: institute_id,
        }
    });
    return res.success(institute);
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            institute_id: schema.string().required(),
        }),
    })).configure({
        name: "InstituteDelete",
        options: {
            methods: ["DELETE"],
            route: "institute/{institute_id}",
        },
    });