import { useState, useEffect } from "react";
import { ArrowLeft, Play, RotateCcw, Save, Settings, Code2, Zap, Database, CheckCircle, XCircle, Clock, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Link, useParams } from "react-router-dom";

const ProblemSolver = () => {
  const { id } = useParams();
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
}`);

  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([
    { id: 1, passed: true, input: "[2,7,11,15], 9", output: "[0,1]", expected: "[0,1]", runtime: "68ms" },
    { id: 2, passed: true, input: "[3,2,4], 6", output: "[1,2]", expected: "[1,2]", runtime: "72ms" }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedRecently, setSavedRecently] = useState(false);

  const problem = {
    id: id || "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6", 
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹", 
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRunning(false);
    setShowSuccess(true);
    


    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSave = () => {
    setSavedRecently(true);
    
    setTimeout(() => setSavedRecently(false), 2000);
  };

  const handleReset = () => {
    setCode(`function twoSum(nums, target) {
    // Write your solution here
    
}`);

  };

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

  return (
    <div className="h-screen gradient-bg flex flex-col relative overflow-hidden">
      {/* Floating particles background */}
      <div className="floating-particles"></div>
      
      {/* Success animation overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-scale-in glass-morphism p-8 rounded-2xl border border-green-500/50">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-2">All Tests Passed!</h3>
              <p className="text-green-400">Excellent work! Your solution is correct.</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="glass-morphism border-b border-purple-500/20 px-6 py-4 relative z-10 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/problems">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Problems
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white hover:text-purple-300 transition-colors cursor-default">
                {problem.id}. {problem.title}
              </h1>
              <Badge className={`${getDifficultyColor(problem.difficulty)} animate-pulse`}>
                {problem.difficulty}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className={`border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 ${savedRecently ? 'animate-pulse border-green-500/50 text-green-300' : ''}`}
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 ${savedRecently ? 'animate-pulse border-green-500/50 text-green-300' : ''}`}
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              {savedRecently ? 'Saved!' : 'Save'}
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              onClick={handleRunCode}
              disabled={isRunning}
            >
              {isRunning ? (
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
            <div className="h-full glass-morphism border-r border-purple-500/20 overflow-y-auto animate-fade-in">
              <div className="p-6 space-y-6">
                {/* Problem header with animated icon */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center animate-spin-slow">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Problem Description</h2>
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
                    {problem.examples.map((example, index) => (
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
                    <ul className="space-y-2">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="text-slate-400 text-sm flex items-start hover:text-slate-300 transition-colors animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                          <span className="text-purple-400 mr-2 animate-pulse">•</span>
                          <code className="bg-slate-800/30 px-2 py-1 rounded text-xs hover:bg-slate-700/50 transition-colors">{constraint}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
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
                      <span className="text-sm text-slate-300 font-medium">JavaScript</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-purple-400 hover:scale-110 transition-all">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${savedRecently ? 'bg-green-400 animate-pulse' : 'bg-green-400 animate-pulse'}`}></div>
                      {savedRecently ? 'Just saved' : 'Auto-saved • 2 seconds ago'}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6 relative">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full bg-transparent text-slate-200 code-editor resize-none outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-inset rounded-lg transition-all duration-300"
                      placeholder="Write your solution here..."
                      style={{ 
                        fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
                        tabSize: 2
                      }}
                    />
                    {/* Code completion hints */}
                    <div className="absolute bottom-4 right-4 text-xs text-slate-500 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-slate-800/80 p-2 rounded">
                        <p>Ctrl+Space: Autocomplete</p>
                        <p>Ctrl+/: Comment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-purple-500/20 hover:bg-purple-500/40 transition-colors duration-300" />

              {/* Test Results Panel */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="h-full glass-morphism border-t border-purple-500/20 animate-fade-in">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-purple-400 animate-pulse" />
                        Test Results
                      </h3>
                      <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-purple-400 hover:scale-105 transition-all">
                        Clear Console
                      </Button>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      {testResults.map((test, index) => (
                        <div key={test.id} className={`glass-morphism border rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] animate-fade-in ${test.passed ? 'border-green-500/30 hover:border-green-400/50' : 'border-red-500/30 hover:border-red-400/50'}`} style={{animationDelay: `${index * 0.1}s`}}>
                          <div className={`font-medium mb-2 flex items-center ${test.passed ? 'text-green-400' : 'text-red-400'}`}>
                            {test.passed ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                            Test Case {test.id}: {test.passed ? 'Passed' : 'Failed'}
                            <Clock className="w-3 h-3 ml-2 text-slate-400" />
                            <span className="text-xs text-slate-400 ml-1">{test.runtime}</span>
                          </div>
                          <div className="text-slate-400 text-xs font-mono">
                            Input: {test.input} → Output: {test.output} (Expected: {test.expected})
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-purple-500/20">
                        <div className="text-slate-300 text-sm mb-2 font-medium flex items-center">
                          <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                          Performance
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="glass-morphism p-3 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-purple-400 font-medium flex items-center">
                              <Target className="w-3 h-3 mr-1" />
                              Runtime
                            </div>
                            <div className="text-white text-lg font-bold">68 ms</div>
                            <div className="text-green-400">Better than 85.5%</div>
                          </div>
                          <div className="glass-morphism p-3 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-purple-400 font-medium flex items-center">
                              <Database className="w-3 h-3 mr-1" />
                              Memory
                            </div>
                            <div className="text-white text-lg font-bold">42.1 MB</div>
                            <div className="text-green-400">Better than 72.3%</div>
                          </div>
                        </div>
                      </div>
                    </div>
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