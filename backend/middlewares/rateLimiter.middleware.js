import rateLimit from "express-rate-limit";

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    msg: "Too many login attempts. Try again after 1 hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    msg: "Too many login attempts. Try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
