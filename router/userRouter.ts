import express from "express";
import { registerUser } from "../controller/userController";

const router = express.Router();
router.route("/create-user").post(registerUser);

export default router;
