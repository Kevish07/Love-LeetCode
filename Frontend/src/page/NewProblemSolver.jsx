import { useState, useEffect } from "react";
import { ArrowLeft, Play, RotateCcw, Save, Settings, Code2, Zap, Database, CheckCircle, XCircle, Clock, Trophy, Target, FileText, MessageSquare, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Link, useParams } from "react-router-dom";
import React from "react";
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
        problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
      );
      setTestCases(
        problem.testCases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
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
    const particles = document.querySelector('.floating-particles');
    if (particles) {
      // Add dynamic particle animation
      const interval = setInterval(() => {
        particles.style.opacity = Math.random() > 0.5 ? '0.8' : '0.4';
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
      executeCode(code, language_id, stdin, expected_outputs, id);
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
           <div className="h-full glass-morphism border-r border-purple-500/20 overflow-y-auto animate-fade-in">
              <div className="p-6 space-y-6">
                {/* Problem header with animated icon */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center animate-spin-slow">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{problem.title}</h2>
                    <p className="text-sm text-slate-400">Solve step by step</p>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none">
                  <div className="mb-6 animate-fade-in">
                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {problem.description}
                    </p>
                  </div>

                  {/* Examples with hover animations */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-purple-400 animate-pulse" />
                      Examples
                    </h3>

                    {Object.entries(problem.examples).map(([lang, example], index) => (
                      <div key={index} className="mb-4 glass-morphism rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="text-sm space-y-3">
                          <div className="hover:bg-slate-800/30 p-2 rounded transition-colors">
                            <span className="text-purple-400 font-medium">Input:</span>
                            <code className="ml-2 text-slate-300 bg-slate-800/50 px-3 py-1 rounded-lg font-mono">
                              {example.input}
                            </code>
                          </div>
                          <div className="hover:bg-slate-800/30 p-2 rounded transition-colors">
                            <span className="text-purple-400 font-medium">Output:</span>
                            <code className="ml-2 text-slate-300 bg-slate-800/50 px-3 py-1 rounded-lg font-mono">
                              {example.output}
                            </code>
                          </div>
                          <div className="hover:bg-slate-800/30 p-2 rounded transition-colors">
                            <span className="text-purple-400 font-medium">Explanation:</span>
                            <span className="ml-2 text-slate-400">{example.explanation}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Constraints with animated icons */}
                  <div>
                    <h3 className="text-md font-semibold text-white mb-3 flex items-center">
                      <Database className="w-4 h-4 mr-2 text-purple-400 animate-pulse" />
                      Constraints
                    </h3>
                    <div className="space-y-2">
                        <span className="text-slate-400 text-sm flex items-start hover:text-slate-300 transition-colors animate-fade-in">
                          <span className="text-purple-400 mr-2 animate-pulse">•</span>
                          <code className="bg-slate-800/30 px-2 py-1 rounded text-xs hover:bg-slate-700/50 transition-colors">{problem.constraints}</code>
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "editorial":
        return (
          <div className="p-4 text-center text-base-content/70">
            
            {problem?.editorial ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg  text-white text-lg">
                  {problem.editorial}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No editorial available for this problem.
              </div>
            )}
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
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
    setCode(`function twoSum(nums, target) {
    // Write your solution here
    
}`);

  };


  return (
    <div className="h-screen bg-[linear-gradient(105deg,_rgb(49,46,100),_rgb(15,23,42),_rgb(30,27,75),_rgb(30,27,75),_rgb(15,23,42))] flex flex-col relative overflow-x-auto">
      {/* Floating particles background */}
      <div className="floating-particles"></div>
      

      {/* Header */}
      <header className="glass-morphism border-b border-purple-500/20 px-6 py-4 relative z-10 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/problems">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Problems
              </Button>
            </Link>
            {/* <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white hover:text-purple-300 transition-colors cursor-default">
                {problem.id}. {problem.title}
              </h1>
              <Badge className={`${getDifficultyColor(problem.difficulty)} animate-pulse`}>
                {problem.difficulty}
              </Badge>
            </div> */}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className={`border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 cursor-pointer `}
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer"
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
      <div className="flex-1 relative">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Problem Description Panel */}
          <ResizablePanel defaultSize={35} minSize={25}>
            {/* /in render tab */}
            <div className="card-body p-0">
              <div className="tabs tabs-bordered">
                <button
                  className={`tab gap-2 ${
                    activeTab === "description" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "submissions" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "editorial" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("editorial")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Editorial
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "hints" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>

              <div className="">{renderTabContent()}</div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-purple-500/20 hover:bg-purple-500/40 transition-colors duration-300" />

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
                          className="select select-bordered select-primary w-40"
                          value={selectedLanguage}
                          onChange={handleLanguageChange}
                        >
                          {Object.keys(problem.codeSnippets || {}).map((lang) => (
                            <option key={lang} value={lang}>
                              {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </option>
                          ))}
                        </select>
                      </span>
                      {/* <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-purple-400 hover:scale-110 transition-all">
                        <Settings className="h-3 w-3" />
                      </Button> */}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6 relative">
                    {/* <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full bg-transparent text-slate-200 code-editor resize-none outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-inset rounded-lg transition-all duration-300"
                      placeholder="Write your solution here..."
                      style={{ 
                        fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
                        tabSize: 2
                      }}
                    /> */}

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

                    {/* Code completion hints */}
                    {/* <div className="absolute bottom-4 right-4 text-xs text-slate-500 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-slate-800/80 p-2 rounded">
                        <p>Ctrl+Space: Autocomplete</p>
                        <p>Ctrl+/: Comment</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-purple-500/20 hover:bg-purple-500/40 transition-colors duration-300" />

              {/* Test Results Panel */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="h-full glass-morphism border-t border-purple-500/20 animate-fade-in overflow-x-auto">
                  <div className="p-6">
                    {submission ? (
                    <Submission submission={submission} />
                  ) : (
                    <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-purple-400 animate-pulse" />
                        Test Results
                      </h3>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      {testcases.map((test, index) => (
                        <div key={test.id} className={`glass-morphism border rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] animate-fade-in ${test.passed ? 'border-green-500/30 hover:border-green-400/50' : 'border-red-500/30 hover:border-red-400/50'}`} style={{animationDelay: `${index * 0.1}s`}}>
                          <div className={`font-medium mb-2 flex items-center ${test.passed ? 'text-green-400' : 'text-red-400'}`}>
                            {test.passed ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                            Test Case : {test.passed ? 'Passed' : 'Failed'}
                          </div>
                          <div className="text-slate-400 text-xs font-mono">
                            Input: {test.input} → (Expected: {test.output})
                          </div>
                        </div>
                      ))}
                      
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