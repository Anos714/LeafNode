import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../validations/auth.js";

export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
  } catch (error) {
    next(error);
  }
};
