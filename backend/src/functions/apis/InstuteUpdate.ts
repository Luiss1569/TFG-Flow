import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

interface Body {
    name: string;
    acronym: string;
  }

const handler: ApiWrapperHandler = async (conn, req) => {
    const { institute_id } = req.params;
    const body = req.body as Body;
    const { name, acronym } = body;

    const institute_exists = await conn.institutes.findUnique({
        where: {
            id: institute_id,
        }
    });

    if (!institute_exists) {
        return res.error(404, null, "Institute not found");
    }

    const institute_update =  await conn.institutes.update({
        where: {
            id: institute_id,
        },
        data: {
            name: name? name : institute_exists.name,
            acronym: acronym ? acronym : institute_exists.acronym,
        },
    });

    return res.success({
        institute_update,
    });
};

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            institute_id: schema.string().required(),
        }),
        body: schema.object().shape({
            name: schema.string().optional(),
            acronym: schema.string().optional(),
        })
    })).configure({
        name: "Institute-Upadate",
        options: {
            methods: ["PUT"],
            route: "institute/{institute_id}",
        },
    });