import express from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
import { DB } from "./config/DB";
env.config();
const app = express();

const port: number = parseInt(process.env.PORT!);

mainApp(app);
const Server = app.listen(port, () => {
  console.log("Server is listening on port", port);
  DB();
});
process.on("uncaughtException", (error) => {
  console.log("");
  console.log("Server is shutting down due to an uncaught exception", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("");
  console.log("Server is shutting down due to an unhandled rejection", reason);

  Server.close(() => {
    process.exit(1);
  });
});
