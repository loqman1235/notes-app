import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  moveNoteToTrash,
  togglePin,
} from "../controllers/note";
import { authenticate } from "../middlewares";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/", authenticate, getNotes);
router.patch("/:noteId/togglePin", authenticate, togglePin);
router.delete("/:noteId", authenticate, deleteNote);
router.patch("/:noteId/move-to-trash", authenticate, moveNoteToTrash);
export default router;
