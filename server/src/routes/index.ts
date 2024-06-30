import express from "express";
import authRoutes from "./auth";
import noteRoutes from "./note";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/notes", noteRoutes);

export default router;
