import ApiWrapper, {
  ApiWrapperHandler,
} from "../../utils/type-functions/apiWrapper";
import res from "../../utils/type-functions/apiResponse";

interface Body {
  content: string;
  activity_id: string;
}

const handler: ApiWrapperHandler = async (conn, req, context) => {
  const { form_id } = req.params;
  const { content, activity_id } = req.body as Body;
  const user = req.user;

  const answer = await conn.answers.create({
    data: {
      content: JSON.parse(content),
      user: {
        connect: {
          id: user.id,
        },
      },
      activity: {
        connect: {
          id: activity_id,
        },
      },
      form: {
        connect: {
          id: form_id,
        },
      },
    },
  });

  return res.created(answer);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      content: schema.string().test("is-json", "Invalid JSON", (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
      activity_id: schema.string().required(),
    }),
  }))
  .configure({
    name: "Form-Response",
    options: {
      methods: ["POST"],
      route: "/form-response/{form_id}",
    },
  });
