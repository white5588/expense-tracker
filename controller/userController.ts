import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../model/userModel";
import { sendMail } from "../config/email";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const value = crypto.randomBytes(2).toString("hex");
    const user = await userModel.create({
      userName,
      email,
      password: hashed,
      otp: value,
    });

    sendMail(user).then(() => {
      console.log("Mail has been sent.....!!!");
    });

    return res.status(201).json({
      message: "Registered User",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "error register user",
      data: error.message,
    });
  }
};
