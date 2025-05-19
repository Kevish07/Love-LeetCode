import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { ApiResponse } from "./utils/api-response.js"

import authRoutes from "./routes/auth.routes.js"

dotenv.config({
    path:"./.env"
})

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.status(200).json(new ApiResponse(200,{},"Sever is running"));
})

app.use("/api/v1/auth",authRoutes)


app.listen(port,()=>{{
    console.log(`Server is running on port: ${port}`)
}})