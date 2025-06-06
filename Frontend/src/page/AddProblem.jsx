import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      }),
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JavaScript: z.object({
      input: z.string().optional(),
      output: z.string().optional(),
      explanation: z.string().optional(),
    }),
    Python: z.object({
      input: z.string().optional(),
      output: z.string().optional(),
      explanation: z.string().optional(),
    }),
    Java: z.object({
      input: z.string().optional(),
      output: z.string().optional(),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JavaScript: z.string().min(1, "JavaScript code snippet is required"),
    Python: z.string().min(1, "Python code snippet is required"),
    Java: z.string().min(1, "Java solution is required"),
  }),
  referenceSolution: z.object({
    JavaScript: z.string().min(1, "JavaScript solution is required"),
    Python: z.string().min(1, "Python solution is required"),
    Java: z.string().min(1, "Java solution is required"),
  }),
});

const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testCases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JavaScript: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    Python: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    Java: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JavaScript: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    Python: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    Java: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolution: {
    JavaScript: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    Python: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    Java: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};

// Sample problem data for another type of question
const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testCases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JavaScript: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    Python: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    Java: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JavaScript: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    Python: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    Java: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolution: {
    JavaScript: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    Python: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    Java: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

const AddProblem = () => {
  const [sampleType, setSampleType] = useState("DP");
  const navigation = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testCases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JavaScript: { input: "", output: "", explanation: "" },
        Python: { input: "", output: "", explanation: "" },
        Java: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JavaScript: "function solution() {\n  // Write your code here\n}",
        Python: "def solution():\n    # Write your code here\n    pass",
        Java: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolution: {
        JavaScript: "// Add your reference solution here",
        Python: "# Add your reference solution here",
        Java: "// Add your reference solution here",
      },
    },
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replacetestCases,
  } = useFieldArray({
    control,
    name: "testCases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/problems/create-problem", value);
      toast.success(res.data.message || "Problem Created successfully⚡");
      navigation("/");
    } catch (error) {
      console.log(error);
      toast.error("Error creating problem");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;
    replaceTags(sampleData.tags.map((tag) => tag));
    replacetestCases(sampleData.testCases.map((tc) => tc));
    reset(sampleData);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.5, type: "spring" },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-900 py-10 px-2 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto bg-zinc-900/90 border border-zinc-800 shadow-2xl rounded-xl p-0 md:p-0 overflow-hidden"
      >
        <div className="border-b border-zinc-800 px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-zinc-900">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={1}
            className="flex items-center gap-3"
          >
            <FileText className="w-7 h-7 text-indigo-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Create Problem
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={2}
            className="flex gap-2"
          >
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                sampleType === "DP"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 text-indigo-200 hover:bg-zinc-700"
              }`}
              onClick={() => setSampleType("DP")}
            >
              DP Problem
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                sampleType === "string"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 text-indigo-200 hover:bg-zinc-700"
              }`}
              onClick={() => setSampleType("string")}
            >
              String Problem
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-indigo-500 text-white font-semibold flex items-center gap-2 hover:bg-indigo-600 transition"
              onClick={loadSampleData}
            >
              <Download className="w-4 h-4" />
              Load Sample
            </button>
          </motion.div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-10 space-y-10"
        >
          {/* Title & Description */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={3}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <label className="block text-indigo-200 font-semibold mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full rounded-md px-4 py-2 bg-zinc-800 text-white placeholder-indigo-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                {...register("title")}
                placeholder="Enter problem title"
              />
              {errors.title && (
                <span className="text-xs text-red-400 mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-indigo-200 font-semibold mb-1">
                Difficulty
              </label>
              <select
                className="w-full rounded-md px-4 py-2 bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                {...register("difficulty")}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
              {errors.difficulty && (
                <span className="text-xs text-red-400 mt-1 block">
                  {errors.difficulty.message}
                </span>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-indigo-200 font-semibold mb-1">
                Description
              </label>
              <textarea
                className="w-full rounded-md px-4 py-2 bg-zinc-800 text-white placeholder-indigo-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base min-h-32 resize-y"
                {...register("description")}
                placeholder="Enter problem description"
              />
              {errors.description && (
                <span className="text-xs text-red-400 mt-1 block">
                  {errors.description.message}
                </span>
              )}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={4}
            className="bg-zinc-800/80 border border-zinc-700 rounded-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-indigo-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Tags
              </h3>
              <button
                type="button"
                className="px-3 py-1 rounded bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-1"
                onClick={() => appendTag("")}
              >
                <Plus className="w-4 h-4" /> Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {tagFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    {...register(`tags.${index}`)}
                    placeholder="Enter tag"
                  />
                  <button
                    type="button"
                    className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-red-400"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.tags && (
              <span className="text-xs text-red-400 mt-2 block">
                {errors.tags.message}
              </span>
            )}
          </motion.div>

          {/* Test Cases */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={5}
            className="bg-zinc-800/80 border border-zinc-700 rounded-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-indigo-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Test Cases
              </h3>
              <button
                type="button"
                className="px-3 py-1 rounded bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-1"
                onClick={() => appendTestCase({ input: "", output: "" })}
              >
                <Plus className="w-4 h-4" /> Add Test Case
              </button>
            </div>
            <AnimatePresence>
              {testCaseFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-zinc-900 border border-zinc-800 rounded p-4 mb-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-indigo-200 font-semibold">
                      Test Case #{index + 1}
                    </span>
                    <button
                      type="button"
                      className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-red-400"
                      onClick={() => removeTestCase(index)}
                      disabled={testCaseFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-indigo-200 font-medium mb-1">
                        Input
                      </label>
                      <textarea
                        className="w-full rounded px-3 py-2 bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm min-h-16 resize-y"
                        {...register(`testCases.${index}.input`)}
                        placeholder="Enter test case input"
                      />
                      {errors.testCases?.[index]?.input && (
                        <span className="text-xs text-red-400 mt-1 block">
                          {errors.testCases[index].input.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-indigo-200 font-medium mb-1">
                        Expected Output
                      </label>
                      <textarea
                        className="w-full rounded px-3 py-2 bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm min-h-16 resize-y"
                        {...register(`testCases.${index}.output`)}
                        placeholder="Enter expected output"
                      />
                      {errors.testCases?.[index]?.output && (
                        <span className="text-xs text-red-400 mt-1 block">
                          {errors.testCases[index].output.message}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.testCases && !Array.isArray(errors.testCases) && (
              <span className="text-xs text-red-400 mt-2 block">
                {errors.testCases.message}
              </span>
            )}
          </motion.div>

          {/* Code Editors for Each Language */}
          <div className="space-y-10">
            {["JavaScript", "Python", "Java"].map((language, idx) => (
              <motion.div
                key={language}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={6 + idx}
                className="bg-zinc-800/80 border border-zinc-700 rounded-md p-6"
              >
                <h3 className="text-lg font-semibold text-indigo-100 mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  {language}
                </h3>
                <div className="mb-6">
                  <label className="block text-indigo-200 font-medium mb-1">
                    Starter Code
                  </label>
                  <Controller
                    name={`codeSnippets.${language}`}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        height="200px"
                        language={language.toLowerCase()}
                        theme="vs-dark"
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  />
                  {errors.codeSnippets?.[language] && (
                    <span className="text-xs text-red-400 mt-1 block">
                      {errors.codeSnippets[language].message}
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-indigo-200 font-medium mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Reference Solution
                  </label>
                  <Controller
                    name={`referenceSolution.${language}`}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        height="200px"
                        language={language.toLowerCase()}
                        theme="vs-dark"
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  />
                  {errors.referenceSolution?.[language] && (
                    <span className="text-xs text-red-400 mt-1 block">
                      {errors.referenceSolution[language].message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-indigo-200 font-medium mb-1">
                    Example
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        className="w-full rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm mb-2"
                        {...register(`examples.${language}.input`)}
                        placeholder="Example input"
                      />
                      {errors.examples?.[language]?.input && (
                        <span className="text-xs text-red-400 mt-1 block">
                          {errors.examples[language].input.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm mb-2"
                        {...register(`examples.${language}.output`)}
                        placeholder="Example output"
                      />
                      {errors.examples?.[language]?.output && (
                        <span className="text-xs text-red-400 mt-1 block">
                          {errors.examples[language].output.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <textarea
                    className="w-full rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm mt-2 resize-y"
                    {...register(`examples.${language}.explanation`)}
                    placeholder="Explain the example"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={10}
            className="bg-zinc-800/80 border border-zinc-700 rounded-md p-6"
          >
            <h3 className="text-lg font-semibold text-indigo-100 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-indigo-200 font-medium mb-1">
                  Constraints
                </label>
                <textarea
                  className="w-full rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm min-h-16 resize-y"
                  {...register("constraints")}
                  placeholder="Enter problem constraints"
                />
                {errors.constraints && (
                  <span className="text-xs text-red-400 mt-1 block">
                    {errors.constraints.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-indigo-200 font-medium mb-1">
                  Hints (Optional)
                </label>
                <textarea
                  className="w-full rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm min-h-16 resize-y"
                  {...register("hints")}
                  placeholder="Enter hints for solving the problem"
                />
              </div>
              <div>
                <label className="block text-indigo-200 font-medium mb-1">
                  Editorial (Optional)
                </label>
                <textarea
                  className="w-full rounded px-3 py-2 bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm min-h-16 resize-y"
                  {...register("editorial")}
                  placeholder="Enter problem editorial/solution explanation"
                />
              </div>
            </div>
          </motion.div>

          <div className="flex justify-end pt-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-bold text-lg flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Create Problem
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProblem;
