import CustomError, { ErrorCode, ValidationErrorDetail } from "./CustomError";
import { HTTP_STATUS } from "../constants";

class BadRequestException extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  code: ErrorCode = "BAD_REQUEST";
  valiadtionErrors?: ValidationErrorDetail[];

  constructor(message: string, validationErrors?: ValidationErrorDetail[]) {
    super(message);
    Object.setPrototypeOf(this, BadRequestException.prototype);
    this.valiadtionErrors = validationErrors;
  }

  serialize(): { message: string; code: ErrorCode } {
    return {
      code: this.code,
      message: this.message,
      ...(this.valiadtionErrors ? { details: this.valiadtionErrors } : {}),
    };
  }
}

export default BadRequestException;
