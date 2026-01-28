import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../validations/auth.js";
import { generateCookieAndToken } from "../utils/helpers/generateCookieAndToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details[0].message,
      });
    }

    const { username, email, password } = value;
    const user = await User.findOne({ email });
    if (user) {
      res.status(404);
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newRegisteredUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    generateCookieAndToken(
      201,
      res,
      "User registered successfully",
      newRegisteredUser,
    );
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details[0].message,
      });
    }

    const { email, password } = value;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Inavlid credentials");
    }

    generateCookieAndToken(200, res, "User logged in successfully", user);
  } catch (error) {
    next(error);
  }
};
