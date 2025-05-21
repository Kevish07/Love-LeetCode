import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const executeCode = async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;

  const userId = req.user.id;

  if (
    !Array.isArray(stdin) ||
    !Array.isArray(expected_outputs) ||
    stdin.length === 0 ||
    expected_outputs.length === stdin.length
  ) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid or Missing test cases"));
  }

  try {
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));
  
    const submitResponse = await submitBatch(submissions)
    const tokens = submissions.map((res)=> res.token)  
    const results = await pollBatchResults(tokens)
  
    console.log(results)
    res.status(200).json(new ApiResponse(200,"Code Executed"))
  } catch (error) {
    res.status(500).json(new ApiError(500,"Error while executing code"))
  }
};

export { executeCode };
