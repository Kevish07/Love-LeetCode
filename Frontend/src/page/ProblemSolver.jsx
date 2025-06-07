import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Save,
  Settings,
  Code2,
  Zap,
  Database,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Target,
  FileText,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Link, useParams } from "react-router-dom";
import { useExecutionStore } from "../store/useExecutionStore";
import { useProblemStore } from "../store/useProblemStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { Editor } from "@monaco-editor/react";
import { getLanguageId } from "../lib/lang";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";

const ProblemSolver = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    // console.log("Problem data:", problem);

    if (problem) {
      setCode(
        problem.codeSnippets?.[selectedLanguage] ||
          submission?.sourceCode ||
          "",
      );
      setTestCases(
        problem.testCases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || [],
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  // Floating particles animation
  useEffect(() => {
    const particles = document.querySelector(".floating-particles");
    if (particles) {
      // Add dynamic particle animation
      const interval = setInterval(() => {
        particles.style.opacity = Math.random() > 0.5 ? "0.8" : "0.4";
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testCases.map((tc) => tc.input);
      const expected_outputs = problem.testCases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id, problem.title);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };
  
  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="h-full animate-fade-in overflow-x-auto scrollbar-none bg-zinc-900/50 rounded-b-xl">
            <div className="p-3 space-y-3">
              {/* Problem header with animated icon */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded flex items-center justify-center animate-spin-slow">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {problem.title}
                  </h2>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold
                      ${
                        problem.difficulty === "EASY"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : problem.difficulty === "MEDIUM"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }
                    `}
                  >
                    {problem.difficulty}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="mb-6 animate-fade-in">
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                    {problem.description}
                  </p>
                </div>

                {/* Examples with hover animations */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-purple-400 animate-pulse" />
                    Examples
                  </h3>
                  {Object.entries(problem.examples).map(
                    ([lang, example], index) =>
                      example.input && (
                        <div
                          key={index}
                          className="mb-2 glass-morphism rounded-md p-2 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 animate-fade-in bg-zinc-800/80"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="text-[.75rem] space-y-0">
                            <div className="hover:bg-slate-800/20 p-1 rounded-none transition-colors">
                              <div className="text-purple-400 font-medium">
                                Input:
                              </div>
                              <code className="text-slate-200 bg-slate-900 px-2 py-1 rounded font-mono">
                                {example.input}
                              </code>
                            </div>
                            <div className="hover:bg-slate-800/20 p-1 rounded-none transition-colors">
                              <div className="text-purple-400 font-medium">
                                Output:
                              </div>
                              <code className="text-slate-200 bg-slate-900 px-2 py-1 rounded font-mono">
                                {example.output}
                              </code>
                            </div>
                            {example.explanation &&
                            (
<div className="hover:bg-slate-800/20 p-1 rounded-none transition-colors">
                              <div className="text-purple-400 font-medium">
                                Explanation:
                              </div>
                              <span className="text-slate-400 px-2 py-1">
                                {example.explanation}
                              </span>
                            </div>
                            )}
                            
                          </div>
                        </div>
                      ),
                  )}
                </div>

                {/* Constraints with animated icons */}
                <div>
                  <h3 className="text-md font-semibold text-white mb-3 flex items-center">
                    <Database className="w-4 h-4 mr-2 text-purple-400 animate-pulse" />
                    Constraints
                  </h3>
                  <div className="space-y-2">
                    <span className="text-slate-400 text-sm flex items-start hover:text-slate-300 transition-colors animate-fade-in">
                      <span className="text-purple-400 mr-2 animate-pulse">
                        •
                      </span>
                      <code className="bg-slate-900/70 px-2 py-1 rounded text-xs hover:bg-slate-800/80 transition-colors text-slate-200">
                        {problem.constraints.split("\n").map((line, index) => (
                    <div key={index} className="mb-2 space-y-1">
                      {line}
                    </div>
                  ))}
                      </code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "submissions":
        return (
          <div className="h-full overflow-x-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
            <SubmissionsList
              submissions={submissions}
              isLoading={isSubmissionsLoading}
            />
          </div>
        );
      case "editorial":
        return (
          <div className="h-full animate-fade-in overflow-x-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
            {problem?.editorial ? (
              <div className="p-6 rounded-xl">
                <span className="py-1 rounded-lg text-white text-lg">
                  {problem.editorial.split("\n").map((line, index) => (
                    
                    <div key={index} className="mb-2 space-y-1">
                      {line}
                    </div>
                  ))}
                </span>
              </div>
            ) : (
              <div className="text-center text-white">
                No editorial available for this problem.
              </div>
            )}
          </div>
        );
      case "hints":
        return (
          <div className="h-full animate-fade-in overflow-x-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
            {problem?.hints ? (
              <div className="p-6 rounded-xl">
                <span className="py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints.split("\n").map((line, index) => (
                    <div key={index} className="mb-2 space-y-1">
                      {line}
                    </div>
                  ))}
                </span>
              </div>
            ) : (
              <div className="text-center text-white">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // ----------------------------------------------------------------------

  const handleReset = () => {
    setCode(
        problem.codeSnippets?.[selectedLanguage] ||
          submission?.sourceCode ||
          "",
      );
  };

  return (
    <div className="h-screen min-h-screen max-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 flex flex-col relative overflow-hidden">
      {/* Floating particles background */}
      <div className="floating-particles pointer-events-none absolute inset-0 z-0" />

      {/* Header */}
      <header className="glass-morphism border-b border-purple-500/20 px-6 py-4 relative z-10 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/problems">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Problems
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/50 text-purple-300 hover:text-purple-500 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer"
              onClick={handleRunCode}
              disabled={isExecuting}
            >
              {isExecuting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Code
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Problem Description Panel */}
          <ResizablePanel defaultSize={35} minSize={25}>
            <div className="h-full flex flex-col">
              <div className="flex border-b border-purple-500/20">
                <button
                  className={`flex-1 py-3 px-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 border-b-2 cursor-pointer ${
                    activeTab === "description"
                      ? "border-purple-500 text-purple-300 bg-zinc-900"
                      : "border-transparent text-purple-400 hover:bg-zinc-800/60"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`flex-1 py-3 px-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 border-b-2 cursor-pointer ${
                    activeTab === "submissions"
                      ? "border-purple-500 text-purple-300 bg-zinc-900"
                      : "border-transparent text-purple-400 hover:bg-zinc-800/60"
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`flex-1 py-3 px-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 border-b-2 cursor-pointer ${
                    activeTab === "editorial"
                      ? "border-purple-500 text-purple-300 bg-zinc-900"
                      : "border-transparent text-purple-400 hover:bg-zinc-800/60"
                  }`}
                  onClick={() => setActiveTab("editorial")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Editorial
                </button>
                <button
                  className={`flex-1 py-3 px-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 border-b-2 cursor-pointer ${
                    activeTab === "hints"
                      ? "border-purple-500 text-purple-300 bg-zinc-900"
                      : "border-transparent text-purple-400 hover:bg-zinc-800/60"
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>
              <div className="flex-1 animate-fade-in overflow-x-auto">
                {renderTabContent()}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="bg-purple-500/20 hover:bg-purple-500/40 transition-colors duration-300"
          />

          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={65} minSize={40}>
            <ResizablePanelGroup direction="vertical">
              {/* Code Editor */}
              <ResizablePanel defaultSize={70} minSize={50}>
                <div className="h-full glass-morphism flex flex-col animate-fade-in">
                  <div className="border-b border-purple-500/20 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
                      </div>
                      <span className="text-sm text-slate-300 font-medium">
                        <select
                          className="w-full appearance-none bg-slate-800 text-slate-100 border border-slate-600 px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={selectedLanguage}
                          onChange={handleLanguageChange}
                        >
                          {Object.keys(problem.codeSnippets || {}).map(
                            (lang) => (
                              <option key={lang} value={lang}>
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                              </option>
                            ),
                          )}
                        </select>
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-[600px] w-full">
                      <Editor
                        height="100%"
                        language={selectedLanguage.toLowerCase()}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: true,
                          readOnly: false,
                          automaticLayout: true,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle
                withHandle
                className="bg-purple-500/20 hover:bg-purple-500/40 transition-colors duration-300"
              />

              {/* Test Results Panel */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="h-full glass-morphism border-t border-purple-500/20 animate-fade-in overflow-y-auto scrollbar-none">
                  <div className="p-6">
                    {submission ? (
                      <Submission submission={submission} />
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-white flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-purple-400 animate-pulse" />
                            Test Cases Data
                          </h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm rounded-lg ">
                            <thead>
                              <tr className="text-purple-300">
                                <th className="py-2 px-3 text-left font-semibold">#</th>
                                <th className="py-2 px-3 text-left font-semibold">Input</th>
                                <th className="py-2 px-3 text-left font-semibold">Expected Output</th>
                              </tr>
                            </thead>
                            <tbody>
                              {testcases.map((test, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/60 transition"
                                >
                                  <td className="py-2 px-3 text-indigo-300 font-semibold">{index + 1}</td>
                                  <td className="py-2 px-3 font-mono text-indigo-200">{test.input}</td>
                                  <td className="py-2 px-3 font-mono text-indigo-200">{test.output}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProblemSolver;
