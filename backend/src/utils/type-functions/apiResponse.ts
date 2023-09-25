import { HttpResponseInit } from "@azure/functions";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

const response = (
  status: StatusCodes,
  body: any,
  err = null
): HttpResponseInit => ({
  status,
  body: JSON.stringify(
    {
      status,
      message: err ?? (getReasonPhrase(status) || "Unknown error"),
      body,
    },
    null,
    2
  ),
});

export const success = (body: any): HttpResponseInit =>
  response(StatusCodes.OK, body);

export const created = (body: any): HttpResponseInit =>
  response(StatusCodes.CREATED, body);

export const badRequest = (message: string): HttpResponseInit =>
  response(StatusCodes.BAD_REQUEST, null, message);

export const unauthorized = (message: string): HttpResponseInit =>
  response(StatusCodes.UNAUTHORIZED, null, message);

export const forbidden = (message: string): HttpResponseInit =>
  response(StatusCodes.FORBIDDEN, null, message);

export const notFound = (message: string): HttpResponseInit =>
  response(StatusCodes.NOT_FOUND, null, message);

export const internalServerError = (message: string): HttpResponseInit =>
  response(StatusCodes.INTERNAL_SERVER_ERROR, null, message);

export const error = (
  status: number,
  body: any,
  message: any
): HttpResponseInit => response(status, body, message);

export default {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  internalServerError,
  error,
  created,
};
