import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllSubmissions, getAllSubmissionsForProblem, getUserSubmissionsForProblem } from "../controllers/submission.controller.js";

const submissionRoutes = express.Router()

submissionRoutes.get("/get-submission/:problemId",authMiddleware,getUserSubmissionsForProblem)
submissionRoutes.get("/get-all-submissions",authMiddleware,getAllSubmissions)
submissionRoutes.get("/get-submission-count/:problemId",authMiddleware,getAllSubmissionsForProblem)


export default submissionRoutes