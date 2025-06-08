import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const executeCode = async (req, res) => {
  const { source_code, stdin, expected_outputs, problemId, problemTitle } =
    req.body;

  const userId = req.user.id;
  
  if (
    !Array.isArray(stdin) ||
    !Array.isArray(expected_outputs) ||
    stdin.length === 0 ||
    expected_outputs.length !== stdin.length
  ) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid or Missing test cases"));
  }

  // Modified code
  const code = Object.entries(source_code) // source_code is an object with language as key and code as value
  const language_id = await getJudge0LanguageId(code[0][0]); // Get the language id from the first key of source_code object
  if (!language_id) {
    return res
      .status(400)
      .json(new ApiError(400, `Language ${code[0][0]} not supported`));
  }
  
  try {
    const submissions = stdin.map((input) => ({
      source_code: code[0][1], // Get the code from the first key of source_code object
      language_id,
      stdin: input,
    }));

    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);
    const results = await pollBatchResults(tokens);
    
    // Checking Answers on all testcases
    let allPassed = true;
    const detailedResults = results.map((testcase, idx) => {
      const stdout = testcase.stdout?.trim();
      const expected_output = expected_outputs[idx]?.trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      return {
        testCase: idx + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: testcase.stderr || null,
        compile_output: testcase.compile_output || null,
        status: testcase.status.description,
        memory: testcase.memory ? `${testcase.memory} KB` : undefined,
        time: testcase.time ? `${testcase.time} s` : undefined,
      };
    });
    
    // Storing to the submission summary
      const submission = await db.submission.create({
        data: {
          userId,
          problemId,
          problemTitle,
          language: code[0][0], // Get the language from the first key of source_code object
          sourceCode: source_code,
          stdin: stdin.join("\n"),
          stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
          stderr: detailedResults.some((r) => r.stderr)
            ? JSON.stringify(detailedResults.map((r) => r.stderr))
            : null,
          compileOutput: detailedResults.some((r) => r.compile_output)
            ? JSON.stringify(detailedResults.map((r) => r.compile_output))
            : null,
          status: allPassed ? "Accepted" : "Wrong Answer",
          memory: detailedResults.some((r) => r.memory)
            ? JSON.stringify(detailedResults.map((r) => r.memory))
            : null,
          time: detailedResults.some((r) => r.time)
            ? JSON.stringify(detailedResults.map((r) => r.time))
            : null,
        },
      });
    
    
    // if all answers are correct then add it to problem solved for the user
    
    if (allPassed) {
      await db.ProblemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
          language: code[0][0],
        },
      });
    }
    
    // Creating testcase result to db
    const testCaseResults = detailedResults.map((result) => ({
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));
    
    await db.TestCasesResult.createMany({
      data:testCaseResults
    })
    
    const submissionWithTestCase = await db.submission.findUnique({
      where:{
        id:submission.id
      },
      include:{
        testCases:true
      }
    })
    
    res.status(200).json(new ApiResponse(200, "Code Executed",submissionWithTestCase));
  } catch (error) {
    console.log(error);
    
    res.status(500).json(new ApiError(500, "Error while executing code"));
  }
};

export { executeCode };
