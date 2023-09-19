import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  HttpTriggerOptions,
} from "@azure/functions";
import * as yup from "yup";
import jwt from "../../services/jwt";

interface THttpRequest {
  body: Object;
  params: Object;
  headers: Object;
  method: string;
  url: string;
  user: Object | null;
  bodyUsed: boolean;
}

export type ApiWrapperHandler = (
  request: THttpRequest,
  context: InvocationContext
) => Promise<HttpResponseInit>;

type AzureFunctionHandler = (
  request: HttpRequest,
  context: InvocationContext
) => Promise<HttpResponseInit>;

type callbackSchema = (schema: typeof yup) => {
  body?: yup.ObjectSchema<yup.AnyObject>;
  params?: yup.ObjectSchema<yup.AnyObject>;
  headers?: yup.ObjectSchema<yup.AnyObject>;
};

export default class ApiWrapper {
  private handler: ApiWrapperHandler;
  private isPublic: boolean = false;
  private schemaValidator = yup.object().shape({
    body: yup.object().shape({}),
    params: yup.object().shape({}),
    headers: yup.object().shape({}),
  });

  constructor(handler: typeof ApiWrapper.prototype.handler) {
    this.handler = handler;
  }
  private run: AzureFunctionHandler = async (request, context) => {
    try {
      const body = await request.json();
      const params = Object.fromEntries(request.query.entries());
      const headers = Object.fromEntries(request.headers.entries());
      let user = null;

      await this.schemaValidator
        .validate({
          body,
          params,
          headers,
        })
        .catch((error) => {
          throw error;
        });

      if (!this.isPublic) {
        user = jwt.verify(headers);
      }

      return await this.handler(
        {
          ...request,
          body,
          params,
          headers,
          user,
        },
        context
      );
    } catch (error) {
      context.error(error);
      return {
        status: error.status || 500,
        body: error.message,
      };
    }
  };

  public configure = (configs: {
    name: string;
    options: HttpTriggerOptions;
  }): this => {
    const { name, options } = configs;
    app.http(name, {
      ...options,
      handler: this.run,
    });
    return this;
  };

  public setPublic = (): this => {
    this.isPublic = true;
    return this;
  };

  public setSchemaValidator = (callback: callbackSchema): this => {
    const { body, params, headers } = callback(yup);

    this.schemaValidator = yup.object().shape({
      body: body ?? yup.object().shape({}),
      params: params ?? yup.object().shape({}),
      headers: headers ?? yup.object().shape({}),
    });

    return this;
  };
}
