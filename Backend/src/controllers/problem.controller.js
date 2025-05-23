import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testCases,
    codeSnippets,
    referenceSolution,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    console.log("Only Admin is allowed to crate a problem");
    return res
      .status(403)
      .json(new ApiError(403, "Only Admin is allowed to crate a problem"));
  }
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = await getJudge0LanguageId(language);

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

      for (let i = 0; i < results.length; i++) {
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

      return res
        .status(200)
        .json(new ApiResponse(200, "Problem created successfully", newProblem));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Problem in creating a problem"));
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();
    if (!problems) {
      return res.status(404).json(new ApiError(404, "No problems found"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, "All problems fetched successfully", problems),
      );
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error in fetching all problems"));
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(400).json(new ApiError(400, "Problem not found"));
    }

    res.status(200).json(new ApiResponse(200, "Given problem found", problem));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Could not find the problem by id"));
  }
};

// Re-Checking remaining...
const updateProblem = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem)
      return res.status(400).json(new ApiError(400, "Problem not found"));

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolution,
    } = req.body;
    if (req.user.role !== "ADMIN") {
      console.log("Only Admin is allowed to update the problem");
      return res
        .status(403)
        .json(new ApiError(403, "Only Admin is allowed to update a problem"));
    }

    // Problem updating { cheated by create problem }

    try {
      for (const [language, solutionCode] of Object.entries(
        referenceSolution,
      )) {
        const languageId = await getJudge0LanguageId(language);

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

        console.log(results);

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

        const newProblem = await db.problem.update({
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

        res
          .status(200)
          .json(
            new ApiResponse(200, newProblem, "Problem updated successfully"),
          );
      }
    } catch (error) {
      res.status(500).json(new ApiError(500, "Problem in updating a problem"));
    }
  } catch (error) {
    res.status(500).json(new ApiError(500, "Unable to update the problem"));
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({ where: { id } });
    if (!problem)
      return res.status(400).json(new ApiError(400, "Problem not found"));

    await db.problem.delete({ where: { id } });

    res.status(200).json(new ApiResponse(200, "Problem deleted successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error in deleting Problem"));
  }
};

const getAllSolvedProblemsByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: req.user.id,
          },
        },
        include: {
          solvedBy: {
            where: {
              userId: req.user.id,
            },
          },
        },
      },
    });
  
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Successfully fetched all solved problems",
          problems,
        ),
      );
  } catch (error) {
    res.status(500).json(500,"Error while fetching all solved problems")
  }
};

export {
  createProblem,
  getAllProblems,
  getAllSolvedProblemsByUser,
  getProblemById,
  updateProblem,
  deleteProblem,
};
