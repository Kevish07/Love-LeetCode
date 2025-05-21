import { db } from "../libs/db.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    userId,
    examples,
    constraints,
    testCases,
    codeSnippets,
    referenceSolution,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(new ApiError(403, "Only Admin is allowed to crate a problem"));
  }
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res
          .status(400)
          .json(new ApiError(400, `Language ${language} not supported`));
      }

      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 1; i <= results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res
            .status(400)
            .json(
              new ApiError(
                400,
                `Testcase ${i} failed for language ${language}`,
              ),
            );
        }
      }

      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testCases,
          codeSnippets,
          referenceSolution,
          userId: req.user.id,
        },
      });

      res.status(200).json(new ApiResponse(200,newProblem,"Problem created successfully"))
    }
  } catch (error) {
    res.status(500).json(new ApiError(500, "Problem in creating a problem"));
  }
};

const getAllProblems = async (req, res) => {
  try {
  } catch (error) {}
};

const getProblemById = async (req, res) => {
  try {
  } catch (error) {}
};

const updateProblem = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteProblem = async (req, res) => {
  try {
  } catch (error) {}
};

const getAllSolvedProblemsByUser = async (req, res) => {
  try {
  } catch (error) {}
};

export {
  createProblem,
  getAllProblems,
  getAllSolvedProblemsByUser,
  getProblemById,
  updateProblem,
  deleteProblem,
};
