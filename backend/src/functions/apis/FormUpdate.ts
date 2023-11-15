import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

interface FormUpdateBody {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  formOpenPeriod?: {
    id: string;
    start_date: Date;
    end_date: Date;
  }[];
  form_type?: string;
  status_id?: string;
  content: any;
}

const updateForm: ApiWrapperHandler = async (conn, req) => {
  const { form_id } = req.params;
  const body = req.body as FormUpdateBody;

  const formOpenPeriod = body.formOpenPeriod.at(0).id
    ? {
        formOpenPeriod: {
          update: {
            data: {
              start_date: new Date(body.formOpenPeriod.at(0).start_date),
              end_date: new Date(body.formOpenPeriod.at(0).end_date),
            },
            where: {
              id: body.formOpenPeriod.at(0).id,
            },
          },
        },
      }
    : {
        formOpenPeriod: {
          create: {
            start_date: new Date(body.formOpenPeriod.at(0).start_date),
            end_date: new Date(body.formOpenPeriod.at(0).end_date),
          },
        },
      };

  const updatedForm = await conn.forms.update({
    where: {
      id: form_id,
    },
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      form_type: body.form_type as "public" | "private",
      content: body.content,
      ...(body.formOpenPeriod.at(0)?.id ? formOpenPeriod : {}),
      status_id: body.status_id,

    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      formOpenPeriod: true,
      form_type: true,
      status: true,
    },
  });

  return res.success({
    updatedForm,
  });
};

export default new ApiWrapper(updateForm)
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      id: schema.string().required(),
      name: schema.string().optional(),
      slug: schema.string().optional(),
      description: schema.string().optional(),
      formOpenPeriod: schema
        .array()
        .of(
          schema
            .object()
            .optional()
            .shape({
              id: schema.string(),
              start_date: schema.string(),
              end_date: schema
                .string()
            })
        )
        .optional(),
      form_type: schema.string().optional(),
      status_id: schema.string().nullable(),
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
                    "boolean",
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
              visible: schema.boolean().optional(),            })
          )
          .min(1)
          .required(),
      }),
    }),
    params: schema.object().shape({
      form_id: schema.string().required(),
    }),
  }))
  .configure({
    name: "FormUpdate",
    options: {
      methods: ["PUT"],
      route: "form/{form_id}",
    },
  });
