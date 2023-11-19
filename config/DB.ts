import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const DB = () => {
  mongoose.connect(process.env.MONGO_STRING!).then(() => {
    console.log("DB attached successfully");
  });
};
