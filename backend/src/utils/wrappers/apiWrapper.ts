import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  HttpRequestParams,
  HttpFunctionOptions,
} from "@azure/functions";
import * as yup from "yup";
import jwt from "../../services/jwt";
import * as prisma from "../../services/prisma";
import * as res from "./apiResponse";

interface THttpRequest {
  body: Object;
  query: Object;
  params: HttpRequestParams;
  headers: Object;
  method: string;
  url: string;
  user: User | null;
  bodyUsed: boolean;
}

interface User {
  id: string;
  name: string;
  matriculation: string;
  email: string;
  role: "student" | "admin" | "teacher" | "coordinator";
}

export type ApiWrapperHandler = (
  conn: ReturnType<typeof prisma.connect>,
  request: THttpRequest,
  context: InvocationContext
) => Promise<HttpResponseInit>;

type AzureFunctionHandler = (
  request: HttpRequest,
  context: InvocationContext
) => Promise<HttpResponseInit>;

type callbackSchema = (schema: typeof yup) => {
  body?: yup.ObjectSchema<yup.AnyObject>;
  query?: yup.ObjectSchema<yup.AnyObject>;
  headers?: yup.ObjectSchema<yup.AnyObject>;
  params?: yup.ObjectSchema<yup.AnyObject>;
};

export default class ApiWrapper {
  private handler: ApiWrapperHandler;
  private isPublic: boolean = false;
  private schemaValidator = yup.object().shape({
    body: yup.object().shape({}).nullable(),
    query: yup.object().shape({}).nullable(),
    params: yup.object().shape({}).nullable(),
    headers: yup.object().shape({}).nullable(),
  });
  private name: string;
  private conn: ReturnType<typeof prisma.connect>;

  constructor(handler: typeof ApiWrapper.prototype.handler) {
    this.handler = handler;
  }
  private run: AzureFunctionHandler = async (request, context) => {
    let conn: ReturnType<typeof prisma.connect>;
    const invocationId = context.invocationId;

    try {
      const body = request.method === "GET" ? {} : request.json();
      const query = Object.fromEntries(request.query.entries());
      const headers = Object.fromEntries(request.headers.entries());
      const params = request.params;
      let user: User = null;

      await this.schemaValidator
        .validate({
          body,
          query,
          headers,
          params,
        })
        .catch((error) => {
          const err = {
            status: 400,
            message: error.message,
          };
          throw err;
        });

      if (!this.isPublic) {
        user = jwt.verify(headers);
      }

      conn = prisma.connect();

      conn.logs.create({
        data: {
          function: this.name,
          user_id: user?.id,
          content: JSON.stringify({
            body,
            query,
            params,
          }),
        },
      });

      return await this.handler(
        conn,
        {
          ...request,
          body,
          query,
          params,
          headers,
          user,
        },
        context
      );
    } catch (error) {
      context.error(JSON.stringify(error, null, 2));
      return res.error(error.status ?? 500, null, error.message ?? error);
    } finally {
      if (conn) await conn.$disconnect();
    }
  };

  public configure = (configs: {
    name: string;
    options: Omit<HttpFunctionOptions, "handler">;
  }): this => {
    const { name, options } = configs;
    this.name = name;

    app.http(name, {
      ...options,
      route: options.route ?? name.toLowerCase().replace(/\s/g, "-"),
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
      query: yup.object().shape({}),
    });

    return this;
  };
}
