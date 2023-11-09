import ApiWrapper, { ApiWrapperHandler } from "../../utils/wrappers/apiWrapper";
import res from "../../utils/wrappers/apiResponse";
import { StepContent } from "../../interfaces/steps";

interface Body {
  name: string;
  status_id: string;
  first_step_id: string;
  steps: Array<{
    id: string;
    name: string;
    type: "send_email" | "swap_workflow" | "conditional" | "request_answer";
    content: StepContent;
    next_step_id?: string;
  }>;
}

function validateFlowSteps(steps: Body["steps"]) {
  const ids = new Set<string>();

  for (const step of steps) {
    if (ids.has(step.id)) {
      const err = {
        statusCode: 400,
        message: `Duplicate step id ${step.id}`,
      };

      throw err;
    }

    ids.add(step.id);
  }

  for (const step of steps) {
    if (step.next_step_id && !ids.has(step.next_step_id)) {
      const err = {
        statusCode: 400,
        message: `Step ${step.id} has a next step id ${step.next_step_id} that does not exist`,
      };

      throw err;
    }
  }
}

const handler: ApiWrapperHandler = async (conn, req) => {
  const body = req.body as Body;

  const { name, status_id } = body;

  validateFlowSteps(body.steps);

  const workflow = await conn.workflows.create({
    data: {
      name,
      status_id,
      first_step_id: body.first_step_id,
    },
  });

  const stepsPromise = conn.steps.createMany({
    data: body.steps.map((step) => ({
      identifier: step.id,
      name: step.name,
      type: step.type,
      content: step.content,
      next_step_id: step.next_step_id,
      workflow_id: workflow.id,
    })),
  });

  const steps = await conn.$transaction([stepsPromise]).catch(async (err) => {
    await conn.workflows.delete({
      where: {
        id: workflow.id,
      },
    });
    throw err;
  });

  return res.success({
    workflow,
    steps: steps.map((step) => step),
  });
};

const stepValidator = (type: string, schema: typeof import("yup")) => {
  if (type === "send_email") {
    return schema.object().shape({
      to: schema.array().of(schema.string()).required(),
      title: schema.string().required(),
      body: schema.string().required(),
    });
  }
  if (type === "swap_workflow") {
    return schema.object().shape({
      status_id: schema.string().uuid().required(),
    });
  }

  if (type === "conditional") {
    return schema.object().shape({
      condition: schema.string().required(),
      true_step_id: schema.string().required(),
      false_step_id: schema.string().required(),
    });
  }

  if (type === "request_answer") {
    return schema.object().shape({
      form_id: schema.string().uuid().required(),
      answers: schema.array().of(schema.string()).required(),
      fieldForm: schema
        .array()
        .of(
          schema.object().shape({
            form_id: schema.string().uuid().required(),
            field_id: schema.string().required().nullable(),
          })
        )
        .required()
        .nullable(),
    });
  }
};

export default new ApiWrapper(handler)
  .setSchemaValidator((schema) => ({
    body: schema.object().shape({
      name: schema.string().required(),
      status_id: schema.string().uuid().required(),
      first_step_id: schema.string().required(),
      steps: schema.array().of(
        schema.object().shape({
          id: schema.string().required(),
          name: schema.string().required(),
          type: schema
            .mixed()
            .oneOf([
              "send_email",
              "swap_workflow",
              "conditional",
              "request_answer",
            ])
            .required(),
          content: schema
            .object()
            .when("type", ([type]) => stepValidator(type, schema)),
          nextStepId: schema.string().optional(),
        })
      ),
    }),
  }))
  .configure({
    name: "Workflow-Create",
    options: {
      methods: ["POST"],
      route: "workflow",
    },
  });
