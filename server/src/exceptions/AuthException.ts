import { HTTP_STATUS } from "../constants";
import CustomError, { ErrorCode, ValidationErrorDetail } from "./CustomError";

class AuthException extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  code: ErrorCode = "UNAUTHORIZED";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthException.prototype);
  }

  serialize(): {
    code: string;
    message: string;
    details?: ValidationErrorDetail[];
  } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export default AuthException;
