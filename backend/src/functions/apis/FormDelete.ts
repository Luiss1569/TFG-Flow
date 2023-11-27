import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
  const { form_id } = req.params;

  const form = await conn.forms.findUnique({
    where: {
      id: form_id,
    },
  });

  if (!form) {
    return res.error(404, null, "Form not found");
  }

  await conn.formOpenPeriod.deleteMany({
    where: {
      form_id,
    },
  });

  await conn.forms.delete({
    where: {
      id: form_id,
    },
  });

  return res.success(form);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object().shape({
      form_id: schema.string().required(),
    }),
  }))
  .configure({
    name: "FormDelete",
    options: {
      methods: ["DELETE"],
      route: "forms/{form_id}",
    },
  });
