import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { status } from "@prisma/client";


const handler: ApiWrapperHandler = async (conn, req) => {
    const {activity_id , name, matriculation, status_id, status: status, created_at, updated_at, user_id } = req.params;
    
    const activity = await conn.activities.findMany({
        where: {
            id: activity_id ? activity_id : undefined,
            name: name ? name : undefined,
            matriculation: +matriculation ? +matriculation : undefined,
            status_id: status_id ? status_id : undefined,
        //status: status ? status : undefined,
            created_at: created_at ? created_at : undefined,
            updated_at: updated_at ? updated_at : undefined,
            user_id: user_id ? user_id : undefined,
        }
    });
    if (!activity) {
        return res.error(404, null, "Activity not found");
    }

    return res.success(activity);
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            activity_id: schema.string().optional(),
            name: schema.string().optional(),
            matriculation: schema.number().optional(),
            status_id: schema.string().optional(),
            //status: schema.enum(status).optional(),
            created_at: schema.string().optional(),
            updated_at: schema.string().optional(),
            user_id: schema.string().optional(),
        })
    })).configure({
        name: "ActivityReport",
        options: {
            methods: ["GET"],
            route: "report/activity",
        },
    });