import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ApiResponse } from "./utils/api-response.js";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoutes from "./routes/executionCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;
const app = express();
// app.use(cors({
//     // origin: process.env.FRONTEND_URL,
//     origin: "*",
//     credentials: true
// }))

const corsOptions = {
  origin: "https://loveleetcode.in", // replace with your frontend origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(200, "Sever is running"));
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execution-code", executionRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);

app.listen(port, () => {
  {
    console.log(`Server is running on port: ${port}`);
  }
});
