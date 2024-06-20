import express from "express";
import { login, register } from "../controllers/auth";

// Middlewares
import { validation } from "../middlewares";
import { registerSchema } from "../validators/auth";

const router = express.Router();

// Register
router.post("/register", validation(registerSchema), register);
router.post("/login", login);

export default router;
