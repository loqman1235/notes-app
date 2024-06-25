import { NextFunction, Request, Response } from "express";
import { AuthException } from "../exceptions";
import { verifyToken } from "../utils/jwt";
import { TokenExpiredError } from "jsonwebtoken";
import { CustomRequest } from "../types/express";
import config from "../config";

const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!accessToken) {
    throw new AuthException("Access token is missing");
  }

  try {
    const payload = verifyToken(accessToken, config.ACCESS_TOKEN_SECRET);

    if (!payload) {
      throw new AuthException("Invalid access token");
    }

    req.userId = payload.userId;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AuthException("Access token expired");
    }

    throw new AuthException("Invalid access token");
  }
};

export default authenticate;
