import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { institutes, university_degrees, user_roles } from "@prisma/client";
import * as bcrypt from "bcrypt";

const handler: ApiWrapperHandler = async (conn , req) => {
    const { user_id } = req.params;
    
    const user = await conn.users.findFirstOrThrow({
        where: {
            id: user_id ? user_id : undefined,
        }
    });
    if (!user) {
        return res.error(404, null, "User not found");
    }

    await conn.users.delete({
        where: {
            id: user_id
        }
    });

    return res.success(user);
};

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        params: schema.object().shape({
            user_id: schema.string().required(),
        }),
    })).configure({
        name: "UserDelete",
        options: {
            methods: ["DELETE"],
            route: "user/{user_id}",
        },
    });
    
