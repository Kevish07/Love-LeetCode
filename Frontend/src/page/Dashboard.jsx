import { useState, useEffect } from "react";
import {
  Clock,
  Code,
  Trophy,
  Target,
  Star,
  CheckCircle,
  BarChart3,
  Search,
  Plus,
  PlaySquare,
  Trash2,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProblemStore } from "../store/useProblemStore";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import { Link } from "react-router-dom";

import {calculateAverageMemory,calculateAverageTime} from "../components/SubmissionList"

const Dashboard = () => {
  const {
    getAllProblems,
    problems,
    isProblemsLoading,
    getSolvedProblemByUser,
    solvedProblems,
  } = useProblemStore();
  const {
    createPlaylist,
    getAllPlaylists,
    playlists,
    getPlaylistDetails,
    removeProblemFromPlaylist,
    deletePlaylist,
  } = usePlaylistStore();
  const { getAllSubmissions, submissions, getSubmissionForProblem } = useSubmissionStore();

  const [activeTab, setActiveTab] = useState("overview");
  const [totalSolved, setTotalSolved] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // const [playlists, setPlaylists] = useState([
  //   {
  //     id: 1,
  //     name: "Array Fundamentals",
  //     problems: [
  //       { id: 1, title: "Two Sum", difficulty: "Easy" },
  //       { id: 3, title: "Binary Search", difficulty: "Medium" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Dynamic Programming",
  //     problems: [{ id: 5, title: "Maximum Subarray", difficulty: "Medium" }],
  //   },
  // ]);

  // const [newPlaylistName, setNewPlaylistName] = useState("");
  // const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);

  // const solvedProblems = [
  //   {
  //     id: 1,
  //     title: "Two Sum",
  //     difficulty: "Easy",
  //     status: "Solved",
  //     date: "2024-01-15",
  //     language: "JavaScript",
  //   },
  //   {
  //     id: 2,
  //     title: "Valid Parentheses",
  //     difficulty: "Easy",
  //     status: "Solved",
  //     date: "2024-01-14",
  //     language: "Python",
  //   },
  //   {
  //     id: 3,
  //     title: "Binary Search",
  //     difficulty: "Medium",
  //     status: "Solved",
  //     date: "2024-01-13",
  //     language: "JavaScript",
  //   },
  //   {
  //     id: 4,
  //     title: "Merge Two Sorted Lists",
  //     difficulty: "Easy",
  //     status: "Solved",
  //     date: "2024-01-12",
  //     language: "Python",
  //   },
  //   {
  //     id: 5,
  //     title: "Maximum Subarray",
  //     difficulty: "Medium",
  //     status: "Solved",
  //     date: "2024-01-11",
  //     language: "JavaScript",
  //   },
  //   {
  //     id: 6,
  //     title: "Climbing Stairs",
  //     difficulty: "Easy",
  //     status: "Solved",
  //     date: "2024-01-10",
  //     language: "Python",
  //   },
  // ];

  // const recentSubmissions = [
  //   {
  //     id: 1,
  //     problem: "Longest Palindromic Substring",
  //     result: "Accepted",
  //     time: "2 hours ago",
  //     runtime: "84ms",
  //     memory: "41.2MB",
  //   },
  //   {
  //     id: 2,
  //     problem: "Container With Most Water",
  //     result: "Accepted",
  //     time: "5 hours ago",
  //     runtime: "120ms",
  //     memory: "45.1MB",
  //   },
  //   {
  //     id: 3,
  //     problem: "3Sum",
  //     result: "Time Limit Exceeded",
  //     time: "1 day ago",
  //     runtime: "N/A",
  //     memory: "N/A",
  //   },
  //   {
  //     id: 4,
  //     problem: "Letter Combinations",
  //     result: "Accepted",
  //     time: "2 days ago",
  //     runtime: "68ms",
  //     memory: "38.9MB",
  //   },
  // ];

  const stats = {
    totalSolved: 156,
    easyCount: 89,
    mediumCount: 52,
    hardCount: 15,
    acceptanceRate: "73.5%",
    totalSubmissions: 212,
  };

  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Why do Java developers wear glasses? Because they can't C#!",
    "What's a programmer's favorite hangout place? Foo Bar!",
    "Why did the programmer quit his job? He didn't get arrays.",
  ];

  const quotes = [
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "First, solve the problem. Then, write the code. - John Johnson",
    "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
    "The best way to get a project done faster is to start sooner. - Jim Highsmith",
    "Code never lies, comments sometimes do. - Ron Jeffries",
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const filteredProblems = solvedProblems.filter((problem) =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // const createPlaylist = () => {
  //   if (newPlaylistName.trim()) {
  //     const newPlaylist = {
  //       id: Date.now(),
  //       name: newPlaylistName,
  //       problems: [],
  //     };
  //     setPlaylists([...playlists, newPlaylist]);
  //     setNewPlaylistName("");
  //     setIsCreatePlaylistOpen(false);
  //   }
  // };

  // const deletePlaylist = (playlistId) => {
  //   setPlaylists(playlists.filter((p) => p.id !== playlistId));
  // };

  // const removeProblemFromPlaylist = (playlistId, problemId) => {
  //   setPlaylists(
  //     playlists.map((playlist) =>
  //       playlist.id === playlistId
  //         ? {
  //             ...playlist,
  //             problems: playlist.problems.filter((p) => p.id !== problemId),
  //           }
  //         : playlist,
  //     ),
  //   );
  // };

  useEffect(() => {
    getSolvedProblemByUser();
    setTotalSolved(solvedProblems.length);
  }, []);

  useEffect(() => {
    getAllPlaylists();
  }, []);

  useEffect(() => {
    getAllSubmissions();
  }, []);

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleRemoveProblemFromPlaylist = async (playlistId, problemInPlaylistId) => {
    await removeProblemFromPlaylist(playlistId, [problemInPlaylistId]);
    window.location.reload();
  }
  
  const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
// console.log("Submissions:", submissions);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Your Dashboard
          </h1>
          <p className="text-slate-400">
            Track your progress and coding journey
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-slate-900/50 p-1 mb-8 border border-purple-500/20">
          {[
            { key: "overview", label: "Overview", icon: BarChart3 },
            { key: "playlists", label: "Playlists", icon: PlaySquare },
            { key: "problems", label: "Solved Problems", icon: CheckCircle },
            { key: "submissions", label: "Recent Submissions", icon: Code },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 hover:rounded-none ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/50 border-slate-600 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-400">
                    Total Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">
                    {solvedProblems.length}
                  </div>
                  <p className="text-xs text-slate-500">+0 this week</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-blue-200 flex items-center">
                    <Trophy className="mr-2 h-5 w-5" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Easy</span>
                        <span className="text-green-400">
                          {stats.easyCount}/200
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(stats.easyCount / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Medium</span>
                        <span className="text-yellow-400">
                          {stats.mediumCount}/150
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${(stats.mediumCount / 150) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Hard</span>
                        <span className="text-red-400">
                          {stats.hardCount}/50
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(stats.hardCount / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quote and Joke Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-blue-200 flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    Daily Quote
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 italic">"{randomQuote}"</p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-blue-200 flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Programming Humor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{randomJoke}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Playlists Tab */}
        {activeTab === "playlists" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-200">
                Your Playlists
              </h2>
              <button
                className="gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center hover:shadow-lg transition-all duration-200 hover:rounded-none cursor-pointer"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Create Playlist
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist, index) => (
                <Card
                  key={playlist.id}
                  className="bg-black/50 border-slate-600 hover:border-purple-500/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-blue-200">
                        {playlist.name}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePlaylist(playlist.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-slate-400">
                      {playlist.problems?.length} problems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {playlist.problems?.length === 0 ? (
                        <p className="text-slate-500 text-sm">
                          No problems added yet
                        </p>
                      ) : (
                        playlist.problems?.map((problem) => (
                          <div
                            key={problem.id}
                            className="flex items-center justify-between p-2 bg-slate-800/50 rounded"
                          >
                            <div className="flex items-center space-x-2">
                               <Link
                          to={`/problem/${problem.problem.id}`}
                          className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
                        >
                              <span className="text-slate-300 text-sm hover:text-indigo-300">
                                {problem.title}
                              </span>
                        </Link>
                              <Badge
                                className={
                                  problem.difficulty === "EASY"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : problem.difficulty === "MEDIUM"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                                }
                              >
                                {problem.difficulty}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleRemoveProblemFromPlaylist(
                                  playlist.id,
                                  problem.id,
                                )
                              }
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Solved Problems Tab */}
        {activeTab === "problems" && (
          <div className="space-y-6 animate-fade-in">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>

            {/* Problems Table */}
            {/* {console.log(solvedProblems)} */}
            <Card className="bg-black/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-blue-200">
                  Solved Problems ({filteredProblems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-400">Problem</TableHead>
                      <TableHead className="text-slate-400">
                        Difficulty
                      </TableHead>
                      <TableHead className="text-slate-400">Language</TableHead>
                      <TableHead className="text-slate-400">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProblems.map((problem, index) => (
                      <TableRow
                        key={problem.id}
                        className="border-slate-700 hover:bg-slate-800/30 transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <TableCell className="text-blue-200 font-medium">
                          {problem.title}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              problem.difficulty === "EASY"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : problem.difficulty === "MEDIUM"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {problem.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {problem.language}
                        </TableCell>
                        <TableCell className="text-slate-400">
                          {formatDate(problem.updatedAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Submissions Tab */}
        {console.log(submissions)
        }
        {activeTab === "submissions" && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-black/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-blue-200 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Recent Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions?.map((submission, index) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500/30 transition-all duration-300 animate-fade-in hover:scale-[1.02]"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            submission.status === "Accepted"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        ></div>
                        <div>
                          <div className="text-blue-200 font-medium">
                            {submission.problemTitle}
                          </div>
                          <div className="text-sm text-slate-400">
                            {formatDate(submission.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={
                            submission.status === "Accepted"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          {submission.status}
                        </Badge>

                        {submission.status === "Accepted" && (
                          <div className="text-xs text-slate-500">
                          {calculateAverageTime(submission.time).toFixed(2)}{" "}s | {calculateAverageMemory(submission.memory).toFixed(2)}{" "}Mb
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default Dashboard;
