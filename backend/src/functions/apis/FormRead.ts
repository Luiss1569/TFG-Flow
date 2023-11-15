import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
  const { form_id } = req.params;

  const forms = await conn.forms.findMany({
    where: {
      id: form_id,
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

  if (!forms) {
    return res.error(404, null, "Status not found");
  }
  return res.success(forms);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object().shape({
      status_id: schema.string().optional(),
    }),
  }))
  .configure({
    name: "FormRead",
    options: {
      methods: ["GET"],
      route: "forms/{form_id?}",
    },
  });
