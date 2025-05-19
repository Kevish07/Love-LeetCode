import express from "express"
import { login, register } from "../controllers/auth.controller.js"

const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post("/login",login)
// authRoutes.post("/logout",register)
// authRoutes.post("/get-profile",register)

export default authRoutes