import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

interface Body {
  name: string;
  description?: string;
  form_type: "public" | "private";
  slug: string;
  status_id?: string;
  content: any;
  formOpenPeriod?: {
    start_date?: string;
    end_date?: string;
  }[];
}

const handler: ApiWrapperHandler = async (conn, req) => {
  const body = req.body as Body;

  const haveOpenPeriod =
    body.formOpenPeriod?.at(0).start_date !== "" && body.formOpenPeriod?.at(0).end_date !== "";

  const objectOpenPeriod = haveOpenPeriod && {
    formOpenPeriod: {
      create: {
        start_date: new Date(body.formOpenPeriod.at(0).start_date),
        end_date: new Date(body.formOpenPeriod.at(0).end_date),
      },
    },
  };

  const form = await conn.forms.create({
    data: {
      name: body.name,
      description: body.description,
      slug: body.slug,
      status_id: body.status_id,
      form_type: body.form_type,
      content: body.content,
      ...(haveOpenPeriod ? objectOpenPeriod : {}),
    },
  });

  return res.success(form);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      name: schema.string().required().max(100),
      form_type: schema.mixed().oneOf(["public", "private"]),
      description: schema.string().max(255),
      formOpenPeriod: schema.array().of(
        schema
          .object()
          .shape({
            start_date: schema.string(),
            end_date: schema.string(),
          })
          .when("form_type", ([form_type], schema) =>
            form_type === "public" ? schema.required() : schema
          )
      ),
      slug: schema
        .string()
        .required()
        .min(3)
        .max(20)
        .trim()
        .matches(/^[a-z0-9-]+$/),
      status_id: schema
        .string()
        .uuid()
        .when("form_type", ([form_type], schema) =>
          form_type === "public" ? schema.required() : schema
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
              value: schema.mixed().optional().nullable(),
              required: schema.boolean(),
              placeholder: schema.string(),
              visible: schema.boolean().optional(),
            })
          )
          .min(1)
          .required(),
      }),
    }),
  }))
  .configure({
    name: "Form-Create",
    options: {
      methods: ["POST"],
      route: "form",
    },
  });
