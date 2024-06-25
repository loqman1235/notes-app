import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const createAccessToken = (payload: any) => {
  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET!, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  });
};

const createRefreshToken = (payload: any) => {
  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET!, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
  });
};

const verifyToken = (token: string, secret: string): JwtPayload | undefined => {
  return jwt.verify(token, secret) as JwtPayload | undefined;
};
export { createAccessToken, createRefreshToken, verifyToken };
