import { NextFunction, Request, Response } from "express";
import { register, login } from "../services/auth.service";
import { LoginInput, RegisterInput } from "../types/user.types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { promisify } from "util";
import User from "../models/user.model";

const registerController = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
): Promise<void> => {
  try {
    const newUser = await register(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  }
};

const loginController = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
): Promise<void> => {
  try {
    const user = await login(req.body);
    res.status(200).json({
      status: "success",
      data: {
        token: user.token,
        user: user.user,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  }
};

const protectController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;
  try {
    //getting token and check if its present
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res
        .status(401)
        .json({ message: "you are not logged in login to get access" });
      return;
    }

    //verify token
    const verifyAsync = promisify(jwt.verify as any);
    const decoded = await verifyAsync(token, JWT_SECRET);

    //check if users still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      res
        .status(401)
        .json({ message: "the user belonging to this token no longer exists" });
      return;
    }

    //check if user changes password after token was issued

    if (await freshUser.changedPasswordAfter(decoded.iat)) {
      res.status(401).json({
        message: "User recently changed Password ! ,Please login again",
      });
    }

    //grant access to the protected Route
    //need to check and add global type on runtime for this   
    // req.user=freshUser
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid or Expired Token" });
    return;
  }
};

export { registerController, loginController, protectController };
