import express from "express";
import { authMiddleware, checkAdmin } from "../middlewares/auth.middleware.js";
import {createProblem,getAllProblems,getProblemById,updateProblem,deleteProblem,getAllSolvedProblemsByUser} from "../controllers/problem.controller.js"

const problemRoutes = express.Router();

problemRoutes.post(
  "/create-problem",
  authMiddleware,
  checkAdmin,
  createProblem
);

problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems);

problemRoutes.get("/get-problem/:id", authMiddleware, getProblemById);

problemRoutes.put(
  "/update-problem/:id",
  authMiddleware,
  checkAdmin,
  updateProblem,
);

problemRoutes.delete(
  "/delete-problem/:id",
  authMiddleware,
  checkAdmin,
  deleteProblem,
);

problemRoutes.get("/get-solved-problems", authMiddleware, getAllSolvedProblemsByUser);

export default problemRoutes;
