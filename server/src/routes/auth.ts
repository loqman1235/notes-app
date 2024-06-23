import express from "express";
import { login, register } from "../controllers/auth";

// Middlewares
import { validation } from "../middlewares";
import { loginSchema, registerSchema } from "../validators/auth";

const router = express.Router();

// Register
router.post("/register", validation(registerSchema), register);
router.post("/login", validation(loginSchema), login);

export default router;
