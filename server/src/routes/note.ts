import express from "express";
import { createNote, getNotes, togglePin } from "../controllers/note";
import { authenticate } from "../middlewares";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/", authenticate, getNotes);
router.put("/:noteId/togglePin", authenticate, togglePin);

export default router;
