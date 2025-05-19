import express from "express";
import {
  login,
  logout,
  register,
  getMe,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.get("/get-profile", authMiddleware, getMe);

export default authRoutes;
