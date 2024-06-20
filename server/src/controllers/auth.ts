import { NextFunction, Request, Response } from "express";
import { getUserByEmail, createUser } from "../services/user";
import sendResponse from "../utils/response";
import { HTTP_STATUS } from "../constants";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      sendResponse(res, HTTP_STATUS.BAD_REQUEST, "User already exists");
    }

    const user = await createUser({ username, email, password });

    sendResponse(res, HTTP_STATUS.CREATED, "User created successfully", user);
  } catch (error) {
    next(error);
  }
};

const login = () => {};

export { register, login };
