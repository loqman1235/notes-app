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
  | "WRONG_CREDENTIALS"
  | "TOKEN_MISSING";

export interface ValidationErrorDetail {
  field: string;
  error: string;
}

abstract class CustomError extends Error {
  abstract statusCode: StatusCode;
  abstract code: ErrorCode;
  valiadtionErrors?: ValidationErrorDetail[];

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serialize(): {
    code: string;
    message: string;
    details?: ValidationErrorDetail[];
  };
}

export default CustomError;
