import express from "express";
import { createNote, getNotes } from "../controllers/note";
import { authenticate } from "../middlewares";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/", authenticate, getNotes);

export default router;
