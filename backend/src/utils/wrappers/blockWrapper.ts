import {
  app,
  InvocationContext,
  ServiceBusQueueFunctionOptions,
} from "@azure/functions";
import * as prisma from "../../services/prisma";
import {
  activities,
  workflows,
  steps,
  activityworkflowSteps,
} from "@prisma/client";
import outputs from "../sbus-outputs";

interface QueueWrapperInterface {
  step_id: string;
  activity_workflow_id: string;
  activity: activities;
  workflow: workflows;
  step: steps;
  activity_workflow_step: activityworkflowSteps;
}

export type QueueWrapperHandler = (
  conn: ReturnType<typeof prisma.connect>,
  message: QueueWrapperInterface,
  context: InvocationContext
) => Promise<void>;

type AzureFunctionHandler = (
  message: Pick<QueueWrapperInterface, "step_id" | "activity_workflow_id">,
  context: InvocationContext
) => Promise<void>;

export default class BlockWrapper {
  private handler: QueueWrapperHandler;

  constructor(handler: typeof BlockWrapper.prototype.handler) {
    this.handler = handler;
  }
  private run: AzureFunctionHandler = async (message, context) => {
    let conn: ReturnType<typeof prisma.connect>;
    let id: string | undefined;

    try {
      conn = prisma.connect();

      const { activity_workflow_id, step_id } = message;

      const activityWorkflow = await conn.activityWorkflow.findUnique({
        where: { id: activity_workflow_id },
        include: {
          activity: true,
          workflow: true,
        },
      });

      if (!activityWorkflow) {
        throw new Error("Activity Workflow not found");
      }

      const activityWorkflowStep = await conn.activityworkflowSteps.create({
        data: {
          active_workflow: {
            connect: {
              id: activity_workflow_id,
            },
          },
          step: {
            connect: {
              id: step_id,
            },
          },
        },
        include: {
          step: true,
        },
      });

      if (!activityWorkflowStep) {
        throw new Error("Activity Workflow Step not created");
      }

      id = activityWorkflowStep.id;

      return await this.handler(
        conn,
        {
          ...message,
          activity: activityWorkflow.activity,
          workflow: activityWorkflow.workflow,
          step: activityWorkflowStep.step,
          activity_workflow_step: activityWorkflowStep,
        },
        context
      )
        .then(async () => {
          if (id) {
            await conn.activityworkflowSteps.update({
              where: {
                id,
              },
              data: {
                status: "done",
                response: "success",
              },
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      context.error(error);

      if (id) {
        await conn.activityworkflowSteps.update({
          where: {
            id,
          },
          data: {
            status: "error",
            response: error.message,
          },
        });
      }

      return Promise.reject(error);
    } finally {
      await conn.$disconnect();
    }
  };

  public configure = (configs: {
    name: string;
    options: Omit<ServiceBusQueueFunctionOptions, "connection" | "handler">;
  }): this => {
    const { name, options } = configs;
    app.serviceBusQueue(name, {
      ...options,
      connection: "AzureServiceBusConnectionString",
      handler: this.run,
      extraOutputs: outputs,
    });
    return this;
  };
}
