import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);

export const authRouter = router;
