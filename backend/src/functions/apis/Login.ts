import ApiWrapper, {
  ApiWrapperHandler,
} from "../../utils/type-functions/apiWrapper";

const handler: ApiWrapperHandler = async (res, context) => {
  return {
    status: 200,
    body: "Hello World!",
  };
};

export default new ApiWrapper(handler)
  .setPublic()
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      email: schema.string().email().required(),
      password: schema.string().required(),
    }),
  }))
  .configure({
    name: "Login",
    options: {
      authLevel: "anonymous",
      methods: ["GET", "POST"],
    },
  });
