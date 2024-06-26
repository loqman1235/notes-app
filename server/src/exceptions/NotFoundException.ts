import CustomError, { ErrorCode } from "./CustomError";
import { HTTP_STATUS } from "../constants";

class NotFoundException extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  code: ErrorCode = "NOT_FOUND";
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }

  serialize(): { message: string; code: ErrorCode } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export default NotFoundException;
