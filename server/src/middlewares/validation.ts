import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ValidationException } from "../exceptions";
import { ValidationErrorDetail } from "../exceptions/CustomError";

export const validation = (
  schema: any
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: ValidationErrorDetail[] = error.errors.map(
          (issue) => {
            return {
              field: issue.path.join("."),
              message: issue.message,
            };
          }
        );

        next(new ValidationException("Validation errors", validationErrors));
      }
    }
  };
};

export default validation;
