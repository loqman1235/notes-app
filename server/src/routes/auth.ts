import express from "express";
// Controllers
import {
  login,
  logout,
  refresh,
  register,
  verifyAccessToken,
} from "../controllers/auth";

// Middlewares
import { authenticate, validation } from "../middlewares";
import { loginSchema, registerSchema } from "../validators/auth";

const router = express.Router();

router.post("/register", validation(registerSchema), register);
router.post("/login", validation(loginSchema), login);
router.post("/logout", authenticate, logout);
router.post("/refresh-token", refresh);
router.get("/verify-token", verifyAccessToken);

export default router;
