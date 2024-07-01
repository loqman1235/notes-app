import { NextFunction, Request, Response } from "express";
import { createNote as createNoteService } from "../services/note";
import sendResponse from "../utils/response";
import { HTTP_STATUS } from "../constants";
import { CustomRequest } from "../types/express";

const createNote = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, content, bgColor, isPinned } = req.body;
  const { userId } = req;

  if (!userId) {
    throw new Error("User not found");
  }

  console.log(userId, "userId");
  console.log(title, "title");
  console.log(content, "content");
  console.log(bgColor, "bgColor");
  console.log(isPinned, "isPinned");

  try {
    const note = await createNoteService(userId, {
      title,
      content,
      bgColor,
      isPinned,
    });

    sendResponse(res, HTTP_STATUS.CREATED, "Note successfully created", {
      note,
    });
  } catch (error) {
    next(error);
  }
};

export { createNote };
