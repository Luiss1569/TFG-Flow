import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
  const { user_id } = req.params;

  const user = await conn.users.findMany({
    where: {
      id: user_id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      matriculation: true,
      institute_id: true,
      created_at: true,
      updated_at: true,
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

  user.forEach((user) => {
    const university_degree = user?.teachers.at(-1)?.university_degree;
    if (university_degree) {
      delete user.teachers;
      user["university_degree"] = university_degree;
    }
  });

  return res.success(user);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object().shape({
      user_id: schema.string().optional(),
    }),
  }))
  .configure({
    name: "UserRead",
    options: {
      methods: ["GET"],
      route: "user/{user_id?}",
    },
  });
