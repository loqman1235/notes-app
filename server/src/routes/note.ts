import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  moveNoteToTrash,
  restoreNote,
  togglePin,
} from "../controllers/note";
import { authenticate } from "../middlewares";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/", authenticate, getNotes);
router.patch("/:noteId/togglePin", authenticate, togglePin);
router.delete("/:noteId", authenticate, deleteNote);
router.patch("/:noteId/move-to-trash", authenticate, moveNoteToTrash);
router.patch("/:noteId/restore", authenticate, restoreNote);
export default router;
