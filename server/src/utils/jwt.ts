import jwt from "jsonwebtoken";
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

export { createAccessToken, createRefreshToken };
