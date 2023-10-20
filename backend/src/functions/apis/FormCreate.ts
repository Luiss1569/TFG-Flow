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
      content: schema.object().shape({
        fields: schema
          .array()
          .of(
            schema.object().shape({
              id: schema.string().required(),
              zod: schema.object().shape({
                type: schema
                  .mixed()
                  .oneOf([
                    "string",
                    "number",
                    "date",
                    "select",
                    "multiselect",
                    "file",
                    "email",
                  ]),
                validation: schema.object(),
              }),
              type: schema
                .mixed()
                .oneOf([
                  "text",
                  "textarea",
                  "select",
                  "radio",
                  "multiselect",
                  "checkbox",
                  "date",
                  "time",
                  "datetime",
                  "file",
                  "number",
                  "email",
                ])
                .required(),
              label: schema.string().required(),
              value: schema.mixed(),
              required: schema.boolean(),
              placeholder: schema.string(),
            })
          )
          .min(1)
          .required(),
      }),
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
