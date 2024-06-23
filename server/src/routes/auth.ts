import express from "express";
// Controllers
import { login, logout, register } from "../controllers/auth";

// Middlewares
import { authenticate, validation } from "../middlewares";
import { loginSchema, registerSchema } from "../validators/auth";

const router = express.Router();

// Register
router.post("/register", validation(registerSchema), register);
router.post("/login", validation(loginSchema), login);
router.post("/logout", authenticate, logout);

export default router;
