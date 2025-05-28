import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import { mockProblems } from "../data/mockData";

export default function NewProblemPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: [],
    tags: [],
    status: [],
  });
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== value,
        );
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  const filteredProblems = mockProblems.filter((problem) => {
    // Search filter
    if (
      searchTerm &&
      !problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Difficulty filter
    if (
      filters.difficulty.length > 0 &&
      !filters.difficulty.includes(problem.difficulty)
    ) {
      return false;
    }

    // Tags filter
    if (
      filters.tags.length > 0 &&
      !problem.tags.some((tag) => filters.tags.includes(tag))
    ) {
      return false;
    }

    // Status filter
    if (filters.status.length > 0) {
      if (filters.status.includes("Solved") && !problem.isSolved) {
        return false;
      }
      if (filters.status.includes("Unsolved") && problem.isSolved) {
        return false;
      }
      if (filters.status.includes("Attempted") && !problem.isAttempted) {
        return false;
      }
    }

    return true;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-500 bg-green-900/20";
      case "medium":
        return "text-yellow-500 bg-yellow-900/20";
      case "hard":
        return "text-red-500 bg-red-900/20";
      default:
        return "text-gray-500 bg-gray-900/20";
    }
  };

  // Reset visibleCount when filters/search change
  useEffect(() => {
    setVisibleCount(5);
  }, [searchTerm, filters]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      visibleCount < filteredProblems.length &&
      !isLoading
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 5, filteredProblems.length));
        setIsLoading(false);
      }, 2000); // 500ms delay
    }
  }, [visibleCount, filteredProblems.length, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Ensure enough problems are loaded to fill the viewport
  useEffect(() => {
    if (
      document.body.scrollHeight <= window.innerHeight &&
      visibleCount < filteredProblems.length &&
      !isLoading
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 5, filteredProblems.length));
        setIsLoading(false);
      }, 2000); // 500ms delay
    }
  }, [visibleCount, filteredProblems.length, isLoading]);

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Problem Set</h1>
          <p className="text-gray-400">
            Sharpen your coding skills with our curated collection of
            algorithmic challenges.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white flex items-center space-x-2"
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-10 p-4">
                <div className="mb-4">
                  <h3 className="text-white font-medium mb-2">Difficulty</h3>
                  <div className="space-y-2">
                    {["Easy", "Medium", "Hard"].map((difficulty) => (
                      <label
                        key={difficulty}
                        className="flex items-center text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(difficulty)}
                          onChange={() =>
                            handleFilterChange("difficulty", difficulty)
                          }
                          className="mr-2 h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                        />
                        {difficulty}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-white font-medium mb-2">Tags</h3>
                  <div className="space-y-2">
                    {[
                      "Array",
                      "String",
                      "Dynamic Programming",
                      "Tree",
                      "Graph",
                      "Sorting",
                    ].map((tag) => (
                      <label
                        key={tag}
                        className="flex items-center text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={filters.tags.includes(tag)}
                          onChange={() => handleFilterChange("tags", tag)}
                          className="mr-2 h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Status</h3>
                  <div className="space-y-2">
                    {["Solved", "Unsolved", "Attempted"].map((status) => (
                      <label
                        key={status}
                        className="flex items-center text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={filters.status.includes(status)}
                          onChange={() => handleFilterChange("status", status)}
                          className="mr-2 h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                        />
                        {status}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Acceptance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredProblems.slice(0, visibleCount).map((problem) => (
                <tr
                  key={problem.id}
                  className="group transition-colors hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {problem.isSolved ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/problem/${problem.id}`}
                      className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
                    >
                      {problem.title}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                        problem.difficulty,
                      )}`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {problem.acceptance}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {problem.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
                          +{problem.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleCount < filteredProblems.length && (
          <div className="text-center py-4 text-gray-400">Loading more...</div>
        )}

        {filteredProblems.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400">
              No problems match your filters. Try adjusting your search
              criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
