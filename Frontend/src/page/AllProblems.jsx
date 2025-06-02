import React, { useEffect } from "react";

import { useProblemStore } from "../store/useProblemStore";
import Loader from "../components/Loader";
import NewProblemPage from "./ProblemPage";

const AllProblems = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="" />
      </div>
    );
  }

  return (
    <>
      {problems.length > 0 ? (
        <NewProblemPage problems={problems} />
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No problems found
        </p>
      )}
    </>
  );
};

export default AllProblems;
