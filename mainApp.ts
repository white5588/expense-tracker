import express, { Application, Request, Response } from "express";
import cors from "cors";
import user from "./router/userRouter";
import { ERROR } from "./error";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PATCH"],
    })
  );
  app.use("/api", user);
  app.get("/", (req: Request, res: Response) => {
    return res.status(ERROR.OK).json({
      message:
        "You're using Kossyrisochukwu Francis Uzoigwe's Expense Tracker API",
    });
  });
};
