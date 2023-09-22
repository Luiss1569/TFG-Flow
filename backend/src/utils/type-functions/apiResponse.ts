import { HttpResponseInit } from "@azure/functions";
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";

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

export const badRequest = (body: any): HttpResponseInit =>
  response(StatusCodes.BAD_REQUEST, body);

export const unauthorized = (body: any): HttpResponseInit =>
  response(StatusCodes.UNAUTHORIZED, body);

export const forbidden = (body: any): HttpResponseInit =>
  response(StatusCodes.FORBIDDEN, body);

export const notFound = (body: any): HttpResponseInit =>
  response(StatusCodes.NOT_FOUND, body);

export const internalServerError = (body: any): HttpResponseInit =>
  response(StatusCodes.INTERNAL_SERVER_ERROR, body);

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
};
