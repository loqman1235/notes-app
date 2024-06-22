import { NextFunction, Request, Response } from "express";

import { CustomError } from "../exceptions";
import { HTTP_STATUS } from "../constants";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.serialize());
  }

  console.log(err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
    error: err.stack || err.message || err,
  });
};

export default errorHandler;
