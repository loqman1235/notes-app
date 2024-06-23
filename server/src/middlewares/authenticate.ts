import { NextFunction, Request, Response } from "express";
import { AuthException } from "../exceptions";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  try {
    if (!refreshToken) {
      throw new AuthException("Refresh token not found");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
