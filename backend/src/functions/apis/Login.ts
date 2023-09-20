import ApiWrapper, {
  ApiWrapperHandler,
} from "../../utils/type-functions/apiWrapper";
import res from "../../utils/type-functions/apiResponse";
import * as bcrypt from "bcrypt";
import jwt from "../../services/jwt";

interface Body {
  cpf: string;
  password: string;
}

const handler: ApiWrapperHandler = async (conn, req, context) => {
  const { cpf, password } = req.body as Body;

  const users = await conn.users.findFirst({
    where: {
      cpf,
    },
  });

  if (!users) {
    return res.notFound("User not found");
  }

  if (!(await bcrypt.compare(password, users.password))) {
    return res.unauthorized("Invalid password");
  }

  const token = await jwt.sign({
    id: users.id,
    name: users.name,
    matriculation: users.matriculation,
    email: users.email,
    cpf: users.cpf,
    role: users.role,
  });

  return res.success({
    token: "Bearer " + token,
  });
};

export default new ApiWrapper(handler)
  .setPublic()
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      cpf: schema
        .string()
        .matches(/^[0-9]{11}$/)
        .required(),
      password: schema.string().required(),
    }),
  }))
  .configure({
    name: "Login",
    options: {
      methods: ["POST"],
    },
  });
