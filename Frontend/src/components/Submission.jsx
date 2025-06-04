import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");

  // Calculate averages
  const avgMemory =
    memoryArr
      .map((m) => parseFloat(m))
      .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr
      .map((t) => parseFloat(t))
      .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testCases.filter((tc) => tc.passed).length;
  const totalTests = submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-8">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-zinc-900/90 border border-purple-700/20 shadow flex flex-col items-center p-5">
          <h3 className="text-xs font-semibold text-purple-400 mb-1">Status</h3>
          <div
            className={`text-lg font-bold flex items-center gap-2 ${
              submission.status === "Accepted"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {submission.status === "Accepted" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            {submission.status}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900/90 border border-purple-700/20 shadow flex flex-col items-center p-5">
          <h3 className="text-xs font-semibold text-purple-400 mb-1">
            Success Rate
          </h3>
          <div className="text-lg font-bold text-indigo-300">
            {successRate.toFixed(1)}%
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900/90 border border-purple-700/20 shadow flex flex-col items-center p-5">
          <h3 className="text-xs font-semibold text-purple-400 mb-1 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Avg. Runtime
          </h3>
          <div className="text-lg font-bold text-indigo-300">
            {avgTime.toFixed(3)} s
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900/90 border border-purple-700/20 shadow flex flex-col items-center p-5">
          <h3 className="text-xs font-semibold text-purple-400 mb-1 flex items-center gap-1">
            <Memory className="w-4 h-4" />
            Avg. Memory
          </h3>
          <div className="text-lg font-bold text-indigo-300">
            {avgMemory.toFixed(0)} KB
          </div>
        </div>
      </div>

      {/* Test Cases Results */}
      <div className="rounded-xl bg-zinc-900/80 border border-purple-700/20 shadow">
        <div className="p-6">
          <h2 className="text-base font-bold text-purple-300 mb-4">
            Test Cases Results
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-zinc-800 text-purple-300">
                  <th className="py-2 px-3 text-left font-semibold">Status</th>
                  <th className="py-2 px-3 text-left font-semibold">
                    Expected Output
                  </th>
                  <th className="py-2 px-3 text-left font-semibold">
                    Your Output
                  </th>
                  <th className="py-2 px-3 text-left font-semibold">Memory</th>
                  <th className="py-2 px-3 text-left font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {submission.testCases.map((testCase) => (
                  <tr
                    key={testCase.id}
                    className="border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/60 transition"
                  >
                    <td className="py-2 px-3">
                      {testCase.passed ? (
                        <div className="flex items-center gap-2 text-green-400 font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-400 font-medium">
                          <XCircle className="w-4 h-4" />
                          Failed
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-3 font-mono text-indigo-200">
                      {testCase.expected}
                    </td>
                    <td className="py-2 px-3 font-mono text-indigo-200">
                      {testCase.stdout || "null"}
                    </td>
                    <td className="py-2 px-3 text-indigo-300">
                      {testCase.memory}
                    </td>
                    <td className="py-2 px-3 text-indigo-300">
                      {testCase.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;
