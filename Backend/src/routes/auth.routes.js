import express from "express"
import { login, logout, register, getMe } from "../controllers/auth.controller.js"

const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post("/login",login)
authRoutes.post("/logout",logout)
authRoutes.post("/get-profile",getMe)

export default authRoutes