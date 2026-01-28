import jwt from "jsonwebtoken";

export const generateCookieAndToken = (statusCode, res, msg, user) => {
  try {
    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_REFRESH_TOKEN,
      {
        expiresIn: "7d",
      },
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(statusCode).json({
      success: true,
      msg,
      user,
    });
  } catch (error) {
    next(error);
  }
};
