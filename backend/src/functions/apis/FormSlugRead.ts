import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { FormContent, FormField } from "../../interfaces/form";

const handler: ApiWrapperHandler = async (conn, req) => {
  const { slug } = req.params;

  const form = await conn.forms.findUnique({
    where: {
      slug,
      AND: {
        formOpenPeriod: {
          every: {
            start_date: {
              lte: new Date(),
            },
            end_date: {
              gte: new Date(),
            },
          },
        },
      },
    },
  });

  if (!form) {
    return res.error(404, null, "Form not found");
  }

  const content = form?.content as unknown as FormContent;

  for (const field of content.fields) {
    if (field.especial_type) {
      field.options = await getEspecialTypes(conn, field);
    }
  }

  return res.success(form);
};

async function getEspecialTypes(
  conn: Parameters<typeof handler>[0],
  field: FormField
): Promise<Array<{ value: string; label: string }>> {
  if (field.especial_type === "teacher") {
    const teacher = await conn.users.findMany({
      where: {
        role: {
          in: ["teacher", "coordinator"],
        },
      },
    });

    return teacher.map((teacher) => ({
      value: teacher.id,
      label: teacher.name,
    }));
  }
}

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object().shape({
      slug: schema.string().required(),
    }),
  }))
  .configure({
    name: "FormSlugRead",
    options: {
      methods: ["GET"],
      route: "/form/slug/{slug}",
    },
  })
  .setPublic();
