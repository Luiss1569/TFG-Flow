import ApiWrapper, {
  ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
  const { form_id } = req.params;

  const form = await conn.forms.findUnique({
      where: {
          id: form_id,
      }
  });

  if (!form) {
      return res.error(404, null, "Institute not found");
  }

  await conn.forms.delete({
      where: {
          id: form_id,
      }
  });
  return res.success(form);
}

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
      params: schema.object().shape({
          form_id: schema.string().required(),
      }),
  })).configure({
      name: "Form-Delete",
      options: {
          methods: ["DELETE"],
          route: "forms/{form_id}",
      },
  });