import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

interface Body {
  name: string;
  description?: string;
  formType: "public" | "private";
  slug: string;
  status_id?: string;
  content: any;
  openPeriod: {
    startDate: string;
    endDate: string;
  };
}

const handler: ApiWrapperHandler = async (conn, req) => {
  const body = req.body as Body;

  const form = await conn.forms.create({
    data: {
      name: body.name,
      description: body.description,
      slug: body.slug,
      status_id: body.status_id,
      form_type: body.formType,
      content: body.content,
      formOpenPeriod: {
        create: {
          start_date: body.openPeriod.startDate,
          end_date: body.openPeriod.endDate,
        },
      },
    },
  });

  return res.success(form);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      name: schema.string().required().max(100),
      formType: schema.mixed().oneOf(["public", "private"]).required(),
      description: schema.string().max(255),
      slug: schema
        .string()
        .required()
        .min(3)
        .max(20)
        .trim()
        .matches(/^[a-z0-9]+$/),
      status_id: schema
        .string()
        .uuid()
        .when("formType", ([formType], schema) =>
          formType === "private" ? schema.required() : schema
        ),
      content: schema
        .string()
        .required()
        .test({
          name: "content",
          message: "content must be an object",
          test: (value) => {
            try {
              JSON.parse(value);
              return true;
            } catch (error) {
              return false;
            }
          },
        })
        .transform((value) => JSON.parse(value)),
      openPeriod: schema.object().shape({
        startDate: schema.date().required(),
        endDate: schema.date().required().min(schema.ref("startDate")),
      }),
    }),
  }))
  .configure({
    name: "Form-Create",
    options: {
      methods: ["POST"],
    },
  });
