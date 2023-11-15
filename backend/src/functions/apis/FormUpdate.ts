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
  status?: boolean;
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
      ...(body.formOpenPeriod.length ? formOpenPeriod : {}),
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
              start_date: schema.date().transform((value) => {
                return new Date(value);
              }),
              end_date: schema
                .date()
                .transform((value) => {
                  return new Date(value);
                })
                .min(schema.ref("start_date")),
            })
        )
        .optional(),
      form_type: schema.string().optional(),
      status: schema.object().optional(),
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
