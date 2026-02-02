import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    msg: "Too many login attempts. Try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
