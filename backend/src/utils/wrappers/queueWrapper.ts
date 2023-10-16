import {
  app,
  InvocationContext,
  ServiceBusQueueFunctionOptions,
} from "@azure/functions";
import * as prisma from "../../services/prisma";
import sbusOutputs from "../sbus-outputs";

type AzureFunctionHandler<TMessage> = (
  message: TMessage,
  context: InvocationContext
) => Promise<void>;

export type QueueWrapperHandler<TMessage> = (
  conn: ReturnType<typeof prisma.connect>,
  ...args: Parameters<AzureFunctionHandler<TMessage>>
) => Promise<void>;

export default class QueueWrapper<TMessage> {
  private handler: QueueWrapperHandler<TMessage>;

  constructor(handler: typeof QueueWrapper.prototype.handler) {
    this.handler = handler;
  }
  private run: AzureFunctionHandler<TMessage> = async (message, context) => {
    let conn: ReturnType<typeof prisma.connect>;

    try {
      conn = prisma.connect();

      return await this.handler(conn, message, context);
    } catch (error) {
      context.error(error);
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
      extraOutputs: sbusOutputs,
    });
    return this;
  };
}
