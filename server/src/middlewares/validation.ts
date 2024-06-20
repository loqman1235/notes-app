import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants";
import sendResponse from "../utils/response";
import { ZodError } from "zod";

export const validation = (
  schema: any
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
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
      }

      return next(error);
    }
  };
};

export default validation;
