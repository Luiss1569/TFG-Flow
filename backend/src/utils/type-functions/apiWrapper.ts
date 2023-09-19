import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  HttpTriggerOptions,
} from "@azure/functions";

export default class ApiWrapper {
  private handler: (
    request: HttpRequest,
    context: InvocationContext
  ) => Promise<HttpResponseInit>;
  
  constructor(
    configuration: { name: string; options: HttpTriggerOptions },
    handler: typeof ApiWrapper.prototype.handler
  ) {
    this.handler = handler;
    this.configure(configuration);
  }
  public run = async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    return await this.handler(request, context);
  };

  private configure = (configs: {
    name: string;
    options: HttpTriggerOptions;
  }): void => {
    const { name, options } = configs;
    app.http(name, {
      ...options,
      handler: this.run,
    });
  };
}