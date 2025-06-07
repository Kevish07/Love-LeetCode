import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";

  // Helper function to safely parse JSON strings
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0]),
    );
    if (memoryArray.length === 0) return 0;

    const averageInKB =
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length;

    const averageInMB = averageInKB / 1024;
    return averageInMB;
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0]),
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

const SubmissionsList = ({ submissions, isLoading }) => {


  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <div className="text-center p-4">
        <div className="text-white">No submissions yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-6">
      {submissions.map((submission) => {
        const avgMemory = calculateAverageMemory(submission.memory);
        const avgTime = calculateAverageTime(submission.time);

        return (
          <div
            key={submission.id}
            className="bg-zinc-900/80 border border-purple-700/20 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left Section: Status and Language */}
              <div className="flex items-center gap-4">
                {submission.status === "Accepted" ? (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold">Accepted</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-6 h-6" />
                    <span className="font-semibold">{submission.status}</span>
                  </div>
                )}
                <span className="px-3 py-1 rounded bg-purple-800/40 text-purple-200 text-xs font-semibold uppercase tracking-wide">
                  {submission.language}
                </span>
              </div>

              {/* Right Section: Runtime, Memory, and Date */}
              <div className="flex flex-wrap items-center gap-4 text-indigo-200 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{avgTime.toFixed(3)} s</span>
                </div>
                <div className="flex items-center gap-1">
                  <Memory className="w-4 h-4" />
                  <span>{avgMemory.toFixed(2)} Mb</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {(() => {
                      const date = new Date(submission.createdAt);
                      return `${String(date.getDate()).padStart(
                        2,
                        "0",
                      )}/${String(date.getMonth() + 1).padStart(
                        2,
                        "0",
                      )}/${date.getFullYear()}`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionsList;
export { calculateAverageMemory, calculateAverageTime }