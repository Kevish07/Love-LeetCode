import { useState } from "react";
import {
  Book,
  Code,
  Target,
  Trophy,
  ChevronRight,
  Clock,
  ArrowLeft,
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
import { Link } from "react-router-dom";

const LearnPage = () => {
  const [selectedPath, setSelectedPath] = useState(null);

  const learningPaths = [
    {
      id: "coding-rookie",
      title: "Coding Rookie",
      description:
        "Perfect for absolute beginners taking their first steps into programming",
      icon: Book,
      color: "text-green-400",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      estimatedTime: "8-12 weeks",
      topics: [
        {
          id: "basic-io",
          name: "Basic Input & Output",
          completed: false,
          problems: [
            { id: "1", title: "Hello World", difficulty: "Easy" },
            { id: "2", title: "Read and Print", difficulty: "Easy" },
            { id: "3", title: "Simple Calculator", difficulty: "Easy" },
          ],
        },
        {
          id: "variables",
          name: "Variables and Data Types",
          completed: false,
          problems: [
            { id: "4", title: "Variable Declaration", difficulty: "Easy" },
            { id: "5", title: "Type Conversion", difficulty: "Easy" },
            { id: "6", title: "Constants vs Variables", difficulty: "Easy" },
          ],
        },
        {
          id: "operators",
          name: "Operators",
          completed: false,
          problems: [
            { id: "7", title: "Arithmetic Operations", difficulty: "Easy" },
            { id: "8", title: "Comparison Operators", difficulty: "Easy" },
            { id: "9", title: "Logical Operators", difficulty: "Easy" },
          ],
        },
      ],
    },
    {
      id: "code-explorer",
      title: "Code Explorer",
      description:
        "Designed for beginners who understand basics and want to build confidence",
      icon: Target,
      color: "text-blue-400",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      estimatedTime: "10-16 weeks",
      topics: [
        {
          id: "strings",
          name: "String Handling",
          completed: false,
          problems: [
            { id: "10", title: "String Concatenation", difficulty: "Easy" },
            { id: "11", title: "String Reversal", difficulty: "Easy" },
            { id: "12", title: "Palindrome Check", difficulty: "Medium" },
          ],
        },
        {
          id: "lists",
          name: "Lists and Arrays",
          completed: false,
          problems: [
            { id: "13", title: "Array Sum", difficulty: "Easy" },
            { id: "14", title: "Find Maximum", difficulty: "Easy" },
            { id: "15", title: "Array Rotation", difficulty: "Medium" },
          ],
        },
        {
          id: "loops",
          name: "Loops and Iteration",
          completed: false,
          problems: [
            { id: "16", title: "Number Pattern", difficulty: "Easy" },
            { id: "17", title: "Factorial Calculation", difficulty: "Easy" },
            { id: "18", title: "Fibonacci Sequence", difficulty: "Medium" },
          ],
        },
        {
          id: "functions",
          name: "Functions",
          completed: false,
          problems: [
            { id: "19", title: "Function Basics", difficulty: "Easy" },
            { id: "20", title: "Function Parameters", difficulty: "Easy" },
            { id: "21", title: "Recursive Functions", difficulty: "Medium" },
          ],
        },
      ],
    },
    {
      id: "algorithm-architect",
      title: "Algorithm Architect",
      description:
        "For intermediate programmers ready to master algorithms and data structures",
      icon: Code,
      color: "text-yellow-400",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      estimatedTime: "14-20 weeks",
      topics: [
        {
          id: "objects",
          name: "Objects and Dictionaries",
          completed: false,
          problems: [
            { id: "22", title: "Object Creation", difficulty: "Medium" },
            { id: "23", title: "Dictionary Operations", difficulty: "Medium" },
            { id: "24", title: "Nested Objects", difficulty: "Medium" },
          ],
        },
        {
          id: "recursion",
          name: "Recursion Mastery",
          completed: false,
          problems: [
            { id: "25", title: "Tower of Hanoi", difficulty: "Medium" },
            { id: "26", title: "Tree Traversal", difficulty: "Medium" },
            { id: "27", title: "Backtracking", difficulty: "Hard" },
          ],
        },
        {
          id: "arrays-2d",
          name: "2D Arrays and Matrices",
          completed: false,
          problems: [
            { id: "28", title: "Matrix Addition", difficulty: "Medium" },
            { id: "29", title: "Spiral Matrix", difficulty: "Medium" },
            { id: "30", title: "Matrix Rotation", difficulty: "Hard" },
          ],
        },
        {
          id: "searching",
          name: "Searching Algorithms",
          completed: false,
          problems: [
            { id: "31", title: "Binary Search", difficulty: "Medium" },
            {
              id: "32",
              title: "Search in Rotated Array",
              difficulty: "Medium",
            },
            { id: "33", title: "Find Peak Element", difficulty: "Medium" },
          ],
        },
        {
          id: "sorting",
          name: "Sorting Algorithms",
          completed: false,
          problems: [
            { id: "34", title: "Merge Sort", difficulty: "Medium" },
            { id: "35", title: "Quick Sort", difficulty: "Medium" },
            { id: "36", title: "Counting Sort", difficulty: "Medium" },
          ],
        },
      ],
    },
    {
      id: "coding-champion",
      title: "Coding Champion",
      description:
        "Advanced challenges for seasoned programmers aiming for mastery",
      icon: Trophy,
      color: "text-purple-400",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      estimatedTime: "16-24 weeks",
      topics: [
        {
          id: "dynamic-programming",
          name: "Dynamic Programming",
          completed: false,
          problems: [
            {
              id: "37",
              title: "Longest Common Subsequence",
              difficulty: "Hard",
            },
            { id: "38", title: "Knapsack Problem", difficulty: "Hard" },
            { id: "39", title: "Edit Distance", difficulty: "Hard" },
          ],
        },
        {
          id: "linked-lists",
          name: "Linked Lists",
          completed: false,
          problems: [
            { id: "40", title: "Reverse Linked List", difficulty: "Medium" },
            { id: "41", title: "Detect Cycle", difficulty: "Medium" },
            { id: "42", title: "Merge K Sorted Lists", difficulty: "Hard" },
          ],
        },
        {
          id: "trees",
          name: "Trees and Binary Trees",
          completed: false,
          problems: [
            { id: "43", title: "Tree Traversal", difficulty: "Medium" },
            { id: "44", title: "Lowest Common Ancestor", difficulty: "Medium" },
            { id: "45", title: "Serialize Binary Tree", difficulty: "Hard" },
          ],
        },
        {
          id: "graphs",
          name: "Graph Algorithms",
          completed: false,
          problems: [
            { id: "46", title: "DFS and BFS", difficulty: "Medium" },
            { id: "47", title: "Dijkstra's Algorithm", difficulty: "Hard" },
            { id: "48", title: "Network Flow", difficulty: "Hard" },
          ],
        },
      ],
    },
  ];

  const selectedPathData = learningPaths.find(
    (path) => path.id === selectedPath,
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedPath ? (
          <>
            {/* Header Section */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Structured Learning Paths
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Carefully crafted curriculum designed for every level of coder.
                Choose your journey and master programming step by step.
              </p>
            </div>

            {/* Learning Paths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {learningPaths.map((path, index) => {
                const IconComponent = path.icon;
                return (
                  <Card
                    key={path.id}
                    className=" bg-black/50 glass-morphism border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 from-slate-800/50 to-slate-900/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${path.bgGradient}`}
                        >
                          <IconComponent className={`h-6 w-6 ${path.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                            {path.title}
                          </CardTitle>
                          <div className="flex items-center space-x-1 mt-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-400">
                              {path.estimatedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-slate-300">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-sm text-slate-400 mb-2">
                          Topics covered: {path.topics.length}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {path.topics.slice(0, 3).map((topic) => (
                            <Badge
                              key={topic.id}
                              variant="secondary"
                              className="text-xs bg-purple-500/20 text-purple-300"
                            >
                              {topic.name}
                            </Badge>
                          ))}
                          {path.topics.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-purple-500/20 text-purple-300"
                            >
                              +{path.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedPath(path.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white transition-all duration-300 cursor-pointer hover:rounded-none"
                      >
                        Start Learning
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Selected Path Details */}
            <div className="mb-8 animate-fade-in">
              <Button
                onClick={() => setSelectedPath(null)}
                variant="ghost"
                className="text-purple-400 hover:text-purple-300 mb-4 cursor-pointer"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learning Paths
              </Button>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {selectedPathData?.title}
                </h1>
                <p className="text-slate-300 text-lg">
                  {selectedPathData?.description}
                </p>
              </div>
            </div>

            {/* Topics List */}
            <div className="space-y-6">
              {selectedPathData?.topics.map((topic, index) => (
                <Card
                  key={topic.id}
                  className=" bg-black/50 glass-morphism border-purple-500/20  animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <CardTitle className="text-xl text-white">
                          {topic.name}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300"
                      >
                        {topic.problems.length} problems
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {topic.problems.map((problem, problemIndex) => (
                        <Card
                          key={problem.id}
                          className="border border-slate-700 transition-all duration-300 bg-gradient-to-br from-slate-800/30 to-slate-900/30 animate-fade-in"
                          style={{ animationDelay: `${problemIndex * 0.05}s` }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-white text-sm">
                                {problem.title}
                              </h4>
                              <Badge
                                variant="secondary"
                                className={`text-xs border ${getDifficultyColor(
                                  problem.difficulty,
                                )}`}
                              >
                                {problem.difficulty}
                              </Badge>
                            </div>
                            <Link to={`/problem/${problem.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-xs border-purple-500/30 text-white transition-all duration-200 hover:text-white hover:border-purple-500/50 cursor-pointer hover:rounded-none"
                              >
                                Solve Problem
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
