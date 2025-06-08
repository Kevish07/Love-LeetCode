import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  ArrowUpRight,
  Plus,
  Bookmark,
  TrashIcon,
  PenBoxIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuthStore } from "../store/useAuthStore";
import { useActions } from "../store/useAction";
import { usePlaylistStore } from "../store/usePlaylistStore";
import AddToPlaylistModal from "../components/AddToPlaylist";
import CreatePlaylistModal from "../components/CreatePlaylistModal";

function ConfirmDeleteModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-red-700 rounded-lg shadow-xl p-6 w-full max-w-xs relative">
        <div className="flex items-center gap-3 mb-4">
          <TrashIcon className="w-7 h-7 text-red-500" />
          <span className="text-lg font-bold text-red-400">Delete Problem?</span>
        </div>
        <p className="text-sm text-red-300 mb-6">
          Are you sure you want to delete this problem? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 text-sm shadow"
          >
            Delete Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProblemPage({ problems }) {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProblemId, setDeleteProblemId] = useState(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
      if (!Array.isArray(problems)) return [];
      const tagsSet = new Set();
      problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
      return Array.from(tagsSet);
  }, [problems]);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteProblemId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteProblem(deleteProblemId);
    setShowDeleteModal(false);
    setDeleteProblemId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteProblemId(null);
  };

  // -----------
  // const [searchTerm, setSearchTerm] = useState("");
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [filters, setFilters] = useState({
  //   difficulty: [],
  //   tags: allTags,
  //   status: [],
  // });


  // const handleFilterChange = (category, value) => {
  //   setFilters((prev) => {
  //     const newFilters = { ...prev };
  //     if (newFilters[category].includes(value)) {
  //       newFilters[category] = newFilters[category].filter(
  //         (item) => item !== value,
  //       );
  //     } else {
  //       newFilters[category] = [...newFilters[category], value];
  //     }
  //     return newFilters;
  //   });
  // };

  // const filteredProblems = problems.filter((problem) => {
  //   // Search filter
  //   if (
  //     searchTerm &&
  //     !problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   ) {
  //     return false;
  //   }

  //   // Difficulty filter
  //   if (
  //     filters.difficulty.length > 0 &&
  //     !filters.difficulty.includes(problem.difficulty)
  //   ) {
  //     return false;
  //   }

  //   // Tags filter
  //   if (
  //     filters.tags.length > 0 &&
  //     !problem.tags.some((tag) => filters.tags.includes(tag))
  //   ) {
  //     return false;
  //   }

  //   return true;
  // });

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty,
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag),
      );
    }, [problems, search, difficulty, selectedTag]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "text-green-500 bg-green-900/40";
      case "MEDIUM":
        return "text-yellow-500 bg-yellow-900/40";
      case "HARD":
        return "text-red-500 bg-red-900/40";
      default:
        return "text-gray-500 bg-gray-900/20";
    }
  };


  const [visibleCount, setVisibleCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  // Reset visibleCount when filters/search change
  useEffect(() => {
    setVisibleCount(2);
  }, [search, filteredProblems]);

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
      }, 500); // 500ms delay
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
      }, 500); // 500ms delay
    }
  }, [visibleCount, filteredProblems.length, isLoading]);

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="text-3xl font-bold text-white mb-2"
            >
              Problem Set
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              className="text-gray-400"
            >
              Sharpen your coding skills with our curated collection of
              algorithmic challenges.
            </motion.p>
          </div>
          <button
            className="gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center hover:shadow-lg transition-all duration-200 hover:rounded-none cursor-pointer"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Create Playlist
          </button>
        </motion.div>

        {/* <div className="mb-8 flex flex-col md:flex-row gap-4">
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
                    {filters.difficulty.map((difficulty) => (
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
                    {filters.tags.map((tag) => (
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
              </div>
            )}
          </div>
        </div> */}
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
            <input
              type="text"
              placeholder="Search by title"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="rounded-md px-4 py-2 bg-zinc-900 border border-zinc-800 text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="ALL">All Difficulties</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            className="rounded-md px-4 py-2 bg-zinc-900 border border-zinc-800 text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="ALL">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Save
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Difficulty
                </th>
                {authUser?.data?.role === "ADMIN" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Edit
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <AnimatePresence>
                {filteredProblems.slice(0, visibleCount).map((problem, idx) => {
                  const isSolved = problem.solvedBy.some(
                    (user) => user.userId === authUser?.data?.id,
                  );
                  return (
                    <motion.tr
                      key={problem.id}
                      className="group transition-colors hover:bg-gray-800/50"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + idx * 0.07,
                        ease: "easeOut",
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isSolved ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-500" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center cursor-pointer"
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
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
                      {authUser?.data?.role === "ADMIN" && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 flex items-center gap-2">
                          <Link
                            to={`/add-problem`}
                            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
                          >
                            <PenBoxIcon className="w-4 h-4" />
                          </Link>
                        <button
                              onClick={() => handleDeleteClick(problem.id)}
                              className="btn btn-sm btn-error"
                            >
                              <TrashIcon className="w-4 h-4 text-white hover:text-red-400/70 cursor-pointer" />
                            </button>
                      </td>
                      )}
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
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {visibleCount < filteredProblems.length && (
          <div className="text-center py-4 text-gray-400">Loading more...</div>
        )}

        {filteredProblems.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-800">
              No problems match your filters. Try adjusting your search
              criteria.
            </p>
          </div>
        )}
      </div>
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
}
