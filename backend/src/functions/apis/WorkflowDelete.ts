import ApiWrapper, {
  ApiWrapperHandler,
} from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";

const handler: ApiWrapperHandler = async (conn, req) => {
  const { workflow_id } = req.params;

  const workflow = await conn.workflows.findUnique({
    where: {
      id: workflow_id,
    },
  });

  if (!workflow) {
    return res.error(404, null, "Workflow not found");
  }

  await conn.workflows.update({
    where: {
      id: workflow_id,
    },
    data: {
      deleted: true,
      deleted_at: new Date(),
    },
  });

  return res.success(workflow);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object().shape({
      workflow_id: schema.string().required(),
    }),
  }))
  .configure({
    name: "WorkflowDelete",
    options: {
      methods: ["DELETE"],
      route: "workflow/{workflow_id}",
    },
  });
