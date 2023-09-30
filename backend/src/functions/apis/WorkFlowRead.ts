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
    include: {
      status: true,
      steps: true,
    },
  });

  if (!workflow) {
    return res.error(404, null, "Workflow not found");
  }

  return res.success(workflow);
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object().shape({
      workflow_id: schema.string().required(),
    }),
  }))
  .configure({
    name: "Workflow-Read",
    options: {
      methods: ["GET"],
      route: "/workflow/{workflow_id}",
    },
  });
