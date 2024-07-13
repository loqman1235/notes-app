import { NextFunction, Request, Response } from "express";
import {
  createNote as createNoteService,
  getNotes as getNotesService,
  deleteNote as deleteNoteService,
  togglePinNote as togglePinNoteService,
  moveNoteToTrash as moveNoteToTrashService,
  restoreNote as restoreNoteService,
} from "../services/note";

import sendResponse from "../utils/response";
import { HTTP_STATUS } from "../constants";
import { CustomRequest } from "../types/express";
import { BadRequestException, NotFoundException } from "../exceptions";

const createNote = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, content, bgColor, isPinned } = req.body;
  const { userId } = req;

  if (!userId) {
    throw new BadRequestException("User ID is missing");
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
    throw new BadRequestException("User ID is missing");
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

const deleteNote = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { noteId } = req.params;
  const { userId } = req;

  if (!userId) {
    throw new Error("User not found");
  }

  if (!noteId) {
    throw new BadRequestException("Note ID is missing");
  }

  try {
    const note = await deleteNoteService(userId, noteId);

    sendResponse(res, HTTP_STATUS.OK, "Note has been permanently deleted", {
      note,
    });

    return;
  } catch (error) {
    next(error);
  }
};

const togglePin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { noteId } = req.params;
  const { userId } = req;
  const { isPinned } = req.body;

  if (!userId) {
    throw new BadRequestException("User ID is missing");
  }

  if (!noteId) {
    throw new BadRequestException("Note ID is missing");
  }

  try {
    const note = await togglePinNoteService(userId, noteId, isPinned);

    sendResponse(res, HTTP_STATUS.OK, "Note successfully pinned", {
      note,
    });
  } catch (error) {
    next(error);
  }
};

const moveNoteToTrash = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { noteId } = req.params;

  if (!userId) {
    throw new BadRequestException("User ID is missing");
  }

  if (!noteId) {
    throw new BadRequestException("Note ID is missing");
  }

  try {
    const note = await moveNoteToTrashService(noteId, userId);

    sendResponse(res, HTTP_STATUS.OK, "Note moved to trash", {
      note,
    });
  } catch (error) {
    next(error);
  }
};

const restoreNote = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { noteId } = req.params;

  if (!userId) {
    throw new BadRequestException("User ID is missing");
  }

  if (!noteId) {
    throw new BadRequestException("Note ID is missing");
  }

  try {
    const note = await restoreNoteService(userId, noteId);
    sendResponse(res, HTTP_STATUS.OK, "Note successfully restored", { note });
  } catch (error) {
    next(error);
  }
};

export {
  createNote,
  getNotes,
  deleteNote,
  togglePin,
  moveNoteToTrash,
  restoreNote,
};
