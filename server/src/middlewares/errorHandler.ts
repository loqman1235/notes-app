import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants";
import sendResponse from "../utils/response";
import config from "../config";
import { CustomError, BadRequestError, NotFoundError } from "../utils/errors";
import { ZodError } from "zod";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.NODE_ENV === "development") {
    console.log(error.stack, "error stack");
  }

  if (error instanceof CustomError) {
    sendResponse(res, error.statusCode, error.message);
    return;
  }

  if (error instanceof ZodError) {
    const validationErrors = error.errors.map((issue) => {
      return {
        field: issue.path.join("."),
        message: issue.message,
      };
    });

    sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Validation errors",
      validationErrors
    );
    return;
  }

  if (error instanceof NotFoundError) {
    sendResponse(res, error.statusCode, error.message);
    return;
  }

  if (error instanceof BadRequestError) {
    sendResponse(res, error.statusCode, error.message);
    return;
  }

  sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
};

export default errorHandler;
