import User from "../models/user.model";
import { RegisterInput, LoginInput } from "../types/user.types";
import { JWT_SECRET } from "../config/env";
import jwt from "jsonwebtoken";

const signToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

const register = async (data: RegisterInput) => {
  const { name, email, password } = data;
  const newUser = new User({ name, email, password });

  const token = signToken(newUser._id.toString());

  await newUser.save();
  return {
    id: newUser._id,
    token,
    name: newUser.name,
    email: newUser.email,
  };
};

const login = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    throw new Error("Invalid Email or Password");
  }

  const token = signToken(user._id.toString());

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};



export { register, login };
