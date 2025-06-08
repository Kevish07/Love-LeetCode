import { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LEVELS = [
  { tag: "LVL-0", label: "Level 0", color: "from-green-500/20 to-emerald-500/20", badge: " text-green-400 border-green-500/30", name: "Newbie" },
  { tag: "LVL-1", label: "Level 1", color: "from-blue-500/20 to-cyan-500/20", badge: " text-blue-400 border-blue-500/30", name: "Beginner" },
  { tag: "LVL-2", label: "Level 2", color: "from-yellow-500/20 to-orange-500/20", badge: " text-yellow-400 border-yellow-500/30", name: "Experience" },
  { tag: "LVL-3", label: "Level 3", color: "from-purple-500/20 to-pink-500/20", badge: " text-purple-400 border-purple-500/30", name: "Advanced" },
];

const LearnPage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  // Group problems by level tag
  const problemsByLevel = LEVELS.reduce((acc, level) => {
    acc[level.tag] = problems.filter(
      (problem) =>
        Array.isArray(problem.tags) &&
        problem.tags.some((tag) => tag.toUpperCase() === level.tag)
    );
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-15 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Level-Based Learning
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Progress through levels by solving problems. Each level unlocks new challenges!
          </p>
        </div>

        <div className="space-y-12">
          {LEVELS.map((level, idx) => (
            <section key={level.tag} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <Card className="mb-6 bg-black/50 glass-morphism border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${level.color}`}>
                      <span className={`font-bold text-lg ${level.badge}`}>{level.label}</span>
                    </div>
                    <CardTitle className="text-2xl text-white">{level.name}</CardTitle>
                  </div>
                  <div className="text-slate-400 text-sm">
                    {problemsByLevel[level.tag]?.length || 0} problems
                  </div>
                </CardHeader>
                <CardContent>
                  {isProblemsLoading ? (
                    <div className="text-slate-400">Loading...</div>
                  ) : problemsByLevel[level.tag]?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {problemsByLevel[level.tag].map((problem) => (
                        <Card
                          key={problem.id}
                          className="border border-slate-700 transition-all duration-300 bg-gradient-to-br from-slate-800/30 to-slate-900/30 animate-fade-in"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-white text-sm">
                                {problem.title}
                              </h4>
                              <Badge
                                variant="secondary"
                                className={`text-xs border ${
                                  problem.difficulty === "EASY"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : problem.difficulty === "MEDIUM"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                                }`}
                              >
                                {problem.difficulty}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {problem.tags?.map((tag) => (
                                <Badge key={tag} className="text-xs bg-slate-700/40 text-slate-300">
                                  {tag}
                                </Badge>
                              ))}
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
                  ) : (
                    <div className="text-slate-500">No problems in this level yet.</div>
                  )}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
