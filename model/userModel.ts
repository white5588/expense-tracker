import mongoose from "mongoose";

interface iUser {
  userName?: string;
  email?: string;
  otp?: string;
  password?: string;
  role?: string;
}

interface iUserData extends iUser, mongoose.Document {}
const userModel = new mongoose.Schema<iUserData>(
  {
    userName: { type: String },
    email: { type: String, unique: true },
    otp: { type: String },
    password: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);
