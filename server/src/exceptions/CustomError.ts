import { HTTP_STATUS } from "../constants";

type StatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "DATABASE_ERROR"
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | "UNPROCESSABLE_ENTITY"
  | "TOKEN_EXPIRED"
  | "TOKEN_INVALID"
  | "TOKEN_NOT_PROVIDED"
  | "WRONG_CREDENTIALS";

export interface ValidationErrorDetail {
  field: string;
  error: string;
}

abstract class CustomError extends Error {
  abstract statusCode: StatusCode;
  field?: string;
  details?: ValidationErrorDetail[];

  constructor(message: string, details?: ValidationErrorDetail[]) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    this.details = details || [];
  }

  abstract serialize(): {
    message: string;
    code: string;
    details?: ValidationErrorDetail[];
  };
}

export default CustomError;
