import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function LearningPath() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Structured Learning Path
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow our carefully crafted curriculum designed for every level of
            coder.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              {
                title: "Fundamentals",
                problems: 150,
                difficulty: "Beginner",
                color: "green",
              },
              {
                title: "Arrays & Strings",
                problems: 200,
                difficulty: "Easy-Medium",
                color: "blue",
              },
              {
                title: "Linked Lists & Trees",
                problems: 180,
                difficulty: "Medium",
                color: "yellow",
              },
              {
                title: "Dynamic Programming",
                problems: 120,
                difficulty: "Medium-Hard",
                color: "purple",
              },
              {
                title: "Graph Algorithms",
                problems: 100,
                difficulty: "Hard",
                color: "red",
              },
              {
                title: "System Design",
                problems: 50,
                difficulty: "Expert",
                color: "cyan",
              },
            ].map((path, index) => (
              <Card
                key={index}
                className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300  shadow-lg hover:shadow-lg transform hover:scale-101"
              >
                <CardContent className="">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-${path.color}-500/20 border border-${path.color}-500/30 flex items-center justify-center`}
                      >
                        <CheckCircle
                          className={`w-6 h-6 text-${path.color}-400`}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {path.title}
                        </h3>
                        <p className="text-gray-400">
                          {path.problems} • {path.difficulty}
                        </p>
                      </div>
                    </div>
                    <Link to="/learn">
                      <Button
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300 cursor-pointer"
                      >
                        Start Learning <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
