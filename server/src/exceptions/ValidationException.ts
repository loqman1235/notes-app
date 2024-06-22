import { HTTP_STATUS } from "../constants";
import CustomError, {
  ErrorCode,
  ValidationErrorDetail,
} from "../exceptions/CustomError";

class ValidationException extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;

  code: ErrorCode = "VALIDATION_ERROR";
  constructor(message: string, details?: ValidationErrorDetail[]) {
    super(message, details);
    Object.setPrototypeOf(this, ValidationException.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  serialize(): {
    message: string;
    code: ErrorCode;
    details?: ValidationErrorDetail[];
  } {
    return {
      message: this.message,
      code: this.code,
      details: this.details,
    };
  }
}

export default ValidationException;
