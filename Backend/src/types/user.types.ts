import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  correctPassword(enteredPassword: string): Promise<boolean>;
  passwordChangedAt: Date;

  changedPasswordAfter(JWTTimestamp: number): Promise<boolean>;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
