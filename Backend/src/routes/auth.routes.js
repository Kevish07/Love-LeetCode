import express from "express"
import { register } from "../controllers/auth.controller.js"

const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post("/login",register)
authRoutes.post("/logout",register)
authRoutes.post("/get-profile",register)

export default authRoutes