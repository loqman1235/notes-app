import { NextFunction, Request, Response } from "express";
import {
  getUserByEmail,
  createUser,
  comparePassword,
  removeRefreshToken,
  storeRefreshToken,
  getRefreshToken,
} from "../services/user";
import { HTTP_STATUS } from "../constants";
import { AuthException, BadRequestException } from "../exceptions";
import config from "../config";

// Utils
import sendResponse from "../utils/response";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../utils/jwt";
import { CustomRequest } from "../types/express";
import { TokenExpiredError } from "jsonwebtoken";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const user = await createUser({ username, email, password });

    const { password: _, ...rest } = user;

    sendResponse(
      res,
      HTTP_STATUS.CREATED,
      "You have successfully registered. Now you can log in",
      {
        user: rest,
      }
    );
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

    // remove password from response
    const { password: _, ...rest } = existingUser;

    // Set refresh token
    const refreshToken = createRefreshToken({ userId: existingUser.id });

    res.cookie(
      config.REFRESH_TOKEN_COOKIE_NAME,
      refreshToken,
      config.REFRESH_TOKEN_COOKIE_OPTIONS
    );

    await storeRefreshToken(existingUser.id, refreshToken);

    sendResponse(res, HTTP_STATUS.OK, "Login successful", {
      user: rest,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    if (!userId) {
      throw new BadRequestException("User not found");
    }

    await removeRefreshToken(userId);
    res.clearCookie(config.REFRESH_TOKEN_COOKIE_NAME);
    sendResponse(res, HTTP_STATUS.OK, "Logout successful");
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  try {
    if (!refreshToken) {
      throw new AuthException("Refresh token is missing");
    }

    const payload = verifyToken(refreshToken, config.REFRESH_TOKEN_SECRET);

    if (!payload) {
      throw new AuthException("Invalid refresh token");
    }

    const user = await getRefreshToken(payload.userId, refreshToken);

    if (!user) {
      throw new AuthException("Invalid refresh token");
    }

    const accessToken = createAccessToken({ userId: user.id });
    const userWithToken = { ...user, accessToken };
    sendResponse(res, HTTP_STATUS.OK, "Refresh successful", {
      user: userWithToken,
    });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new AuthException("Refresh token expired"));
    }

    next(error);
  }
};

export { register, login, logout, refresh };
