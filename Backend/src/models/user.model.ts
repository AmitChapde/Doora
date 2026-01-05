import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.types";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid Email Address",
      },
    },
    password: { type: String, required: true, select: false, minLength: 8 },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

//This hook works between when we ge the data and when its persisted to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

//Instance method to compare passwords
userSchema.methods.correctPassword = async function (
  this: IUser,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (
  this: IUser,
  JWTTimestamp: number
) {
  //if this property doesnt exist on the document means the user hasnt changed the password
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    return JWTTimestamp < changedTimestamp;
  }

  //false means password not changed
  return false;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
