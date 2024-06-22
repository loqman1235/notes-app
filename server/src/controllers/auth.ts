import { NextFunction, Request, Response } from "express";
import { getUserByEmail, createUser } from "../services/user";
import sendResponse from "../utils/response";
import { HTTP_STATUS } from "../constants";
import { BadRequestException } from "../exceptions";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const user = await createUser({ username, email, password });

    sendResponse(res, HTTP_STATUS.CREATED, "User created successfully", user);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  // TODO
  sendResponse(res, HTTP_STATUS.OK, "User logged in successfully");
};

export { register, login };
