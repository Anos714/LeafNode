import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import {
  loginLimiter,
  registerLimiter,
} from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);

export const authRouter = router;
