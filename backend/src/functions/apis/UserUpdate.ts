import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { activities, forms, workflows } from "@prisma/client";
import { institutes, university_degrees, user_roles } from "@prisma/client";
import { stat } from "fs";
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

/**
 * @param conn - Database connection object
 * @param req - Request object
 * Function that updates a user
 */
const handler: ApiWrapperHandler = async (conn, req) => {
  const body = req.body as Body;
  const { user_id } = req.params;

  const {
    name,
    cpf,
    role,
    email,
    password,
    matriculation,
    institute_id,
    university_degree,
  } = body;

  const user = await conn.users.findUnique({
    where: {
      id: user_id,
    },
    select: {
      id: true,
      name: true,
      cpf: true,
      role: true,
      email: true,
      password: true,
      matriculation: true,
      institute_id: true,
      teachers: {
        select: {
          university_degree: true,
        },
      },
    },
  });
  if (!user) {
    return res.error(404, null, "User not found");
  }

  const user_update = await conn.users.update({
    where: {
      id: user_id,
    },
    data: {
      name: name ? name : user.name,
      cpf: cpf ? cpf : user.cpf,
      role: role ? role : user.role,
      email: email ? email : user.email,
      password: password ? bcrypt.hashSync(password, 10) : user.password,
      matriculation: matriculation ? matriculation : user.matriculation,
      institute: {
        connect: {
          id: institute_id ? institute_id : user.institute_id,
        },
      },
      ...(role === "teacher" || role === "coordinator"
        ? {
            teachers: {
              upsert: {
                create: {
                  university_degree: university_degree,
                },
                update: {
                  university_degree: university_degree,
                },
                where: {
                  user_id: user_id,
                },
              },
            },
          }
        : {}),
    },
  });

  return res.success({
    user_update,
  });
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object().shape({
      user_id: schema.string().required(),
    }),
    body: schema.object().shape({
      name: schema.string().optional(),
      cpf: schema.string().optional(),
      role: schema.string().optional(),
      email: schema.string().optional(),
      password: schema.string().optional(),
      matriculation: schema.string().optional(),
      institute_id: schema.string().optional(),
      university_degree: schema.string().optional().nullable(),
    }),
  }))
  .configure({
    name: "User-Update",
    options: {
      methods: ["PUT"],
      route: "user/{user_id}",
    },
  });
