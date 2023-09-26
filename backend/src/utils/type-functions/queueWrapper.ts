import {
  app,
  InvocationContext,
  ServiceBusQueueFunctionOptions,
} from "@azure/functions";
import * as prisma from "../../services/prisma";

export type ApiWrapperHandler<TMessage> = (
  conn: ReturnType<typeof prisma.connect>,
  message: TMessage,
  context: InvocationContext
) => Promise<void>;

type AzureFunctionHandler<TMessage> = (
  message: TMessage,
  context: InvocationContext
) => Promise<void>;

export default class ApiWrapper<TMessage> {
  private handler: ApiWrapperHandler<TMessage>;

  constructor(handler: typeof ApiWrapper.prototype.handler) {
    this.handler = handler;
  }
  private run: AzureFunctionHandler<TMessage> = async (message, context) => {
    try {
      const conn = prisma.connect();

      return await this.handler(conn, message, context);
    } catch (error) {
      context.error(error);
      return Promise.reject(error);
    }
  };

  public configure = (configs: {
    name: string;
    options: ServiceBusQueueFunctionOptions;
  }): this => {
    const { name, options } = configs;
    app.serviceBusQueue(name, {
      connection: "AzureServiceBusConnectionString",
      queueName: options.queueName,
      handler: this.run,
    });
    return this;
  };
}
