import CustomError, { ErrorCode } from "./CustomError";
import { HTTP_STATUS } from "../constants";

class BadRequestException extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  code: ErrorCode = "BAD_REQUEST";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }

  serialize(): { message: string; code: ErrorCode } {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

export default BadRequestException;
