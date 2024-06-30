import { NextFunction, Request, Response } from "express";
import { createNote as createNoteService } from "../services/note";
import sendResponse from "../utils/response";
import { HTTP_STATUS } from "../constants";

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, bgColor, isPinned } = req.body;

  try {
    const note = await createNoteService({ title, content, bgColor, isPinned });

    sendResponse(res, HTTP_STATUS.CREATED, "Note successfully created", {
      note,
    });
  } catch (error) {
    next(error);
  }
};

export { createNote };
