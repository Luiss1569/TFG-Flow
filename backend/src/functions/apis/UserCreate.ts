import ApiWrapper, {
    ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { institutes, university_degrees, user_roles } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface Body {
    name: string;
    cpf: string;
    role: user_roles;
    email: string;
    password: string;
    matriculation: string;
    institute_id: institutes["id"];
    university_degree: university_degrees;
}

const handler: ApiWrapperHandler = async (conn, req) => {
    const body = req.body as Body;

    const { name, cpf, role, email, password, matriculation, institute_id, university_degree } = body;

    const hash = bcrypt.hashSync(password, 10);

    const user = await conn.users.create({
        data: {
            name,
            cpf,
            role,
            email,
            password: hash,
            matriculation,
            institute: {
                connect: {
                    id: institute_id
                }
            },
            ...(role === 'teacher' ? {
                teachers: {
                    create: {
                        matriculation,
                        university_degree
                    }
                }
            } : {})
        },
    });

    return res.success({
        user,
    });
}

export default new ApiWrapper(handler)
    .setSchemaValidator((schema) => ({
        body: schema.object().shape({
            name: schema.string().required(),
            cpf: schema.string().required(),
            role: schema.mixed().oneOf([
                'student',
                'teacher',
                'coordinator',
                'admin',
            ]).required(),
            email: schema.string().required(),
            password: schema.string().required(),
            matriculation: schema.string().required(),
            institute_id: schema.string().required(),
            university_degree: schema.mixed().oneOf([
                'mastermin',
                'doctor',
            ]).when('role', ([role], schema) => role === 'teacher' ? schema.required() : schema.notRequired()).nullable(),
        })
    })).configure({
        name: "UserCreate",
        options: {
            methods: ["POST"],
            route: "user",
        },
    }).setPublic();