import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      res.status(403);
      throw new Error("Token is missing or invalid");
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
