import ApiWrapper from "../../utils/type-functions/apiWrapper";

const Login = new ApiWrapper(
  {
    name: "Login",
    options: {
      authLevel: "anonymous",
      methods: ["GET"],
    },
  },
  async (request, context) => {
    return {
      status: 200,
      body: "Hello World!",
    };
  }
);
