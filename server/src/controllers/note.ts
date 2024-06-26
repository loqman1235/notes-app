import { NextFunction, Request, Response } from "express";
import {
  createNote as createNoteService,
  getNotes as getNotesService,
} from "../services/note";
import sendResponse from "../utils/response";
import { HTTP_STATUS } from "../constants";
import { CustomRequest } from "../types/express";
import { NotFoundException } from "../exceptions";

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

const getNotes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  if (!userId) {
    throw new Error("User not found");
  }

  try {
    const notes = await getNotesService(userId);

    if (notes.length === 0) {
      throw new NotFoundException("No notes found");
    }

    sendResponse(res, HTTP_STATUS.OK, "Notes successfully fetched", {
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export { createNote, getNotes };
