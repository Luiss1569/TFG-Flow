import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { activities, forms, workflows } from "@prisma/client";
import { stat } from "fs";

interface Body {
    name: string;
}

const handler: ApiWrapperHandler = async (conn, req) => {
    const body = req.body as Body;
    const{status_id}= req.params

    const { name } = body;

    const status = await conn.status.findUnique({
        where: {
            id : status_id,
        },
    });
    if(!status){
        return res.error(404, null, "Status not found");
    }

    const status_update = await conn.status.update({
        where: {
            id: status_id,
        },
        data: {
            name: name ? name : status.name,
        },
    });

    return res.success({
        status,
    });
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            status_id: schema.string().required(),
        }),
        body: schema.object().shape({
            name: schema.string().optional(),
        }),
    })).configure({
        name: "StatusUpdate",
        options: {
            methods: ["PUT"],
            route: "status/{status_id}",
        },
    });
    