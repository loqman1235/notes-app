import { NextFunction, Request, Response } from "express";
import {
  getUserByEmail,
  createUser,
  comparePassword,
  storeRefreshToken,
  removeRefreshToken,
} from "../services/user";
import { HTTP_STATUS } from "../constants";
import { AuthException, BadRequestException } from "../exceptions";
import config from "../config";

// Utils
import sendResponse from "../utils/response";
import { createAccessToken, createRefreshToken } from "../utils/jwt";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const user = await createUser({ username, email, password });

    const { password: _, ...rest } = user;

    sendResponse(res, HTTP_STATUS.CREATED, "User created successfully", {
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    //  Check if user exist
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new AuthException("Wrong credentials");
    }

    // Check password
    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) {
      throw new AuthException("Wrong credentials");
    }

    // Create access token
    const accessToken = createAccessToken({ userId: existingUser.id });

    const userWithToken = { ...existingUser, accessToken };

    // Set refresh token
    const refreshToken = createRefreshToken({ userId: existingUser.id });

    res.cookie(
      config.REFRESH_TOKEN_COOKIE_NAME,
      refreshToken,
      config.REFRESH_TOKEN_COOKIE_OPTIONS
    );

    await storeRefreshToken(existingUser.id, refreshToken);

    sendResponse(res, HTTP_STATUS.OK, "Login successful", {
      user: userWithToken,
    });
  } catch (error) {
    next(error);
  }
};

// const logout = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.clearCookie(config.REFRESH_TOKEN_COOKIE_NAME);
//     res.sendStatus(HTTP_STATUS.OK);
//     await removeRefreshToken(req.userId);
//   } catch (error) {
//     next(error);
//   }
// };

export { register, login };
