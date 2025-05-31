import { Brain, Code, Trophy, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function WhyCode() {
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleFeatures((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 },
    );

    document
      .querySelectorAll(".feature-card")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  const getFeatureAnimation = (index) => {
    if (!visibleFeatures.includes(index)) return "opacity-0 translate-y-10";
    return "opacity-100 translate-y-0";
  };
  const features = [
    {
      icon: <Code className="h-6 w-6 text-indigo-400" />,
      title: "Customized Problem Sets",
      description:
        "Handpicked problems organized by patterns, difficulty, and frequency.",
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      title: "Reference Learning",
      description:
        "Visualize algorithms, step through solutions, and understand core concepts.",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: "Real-time Execution",
      description:
        "Write and run code in your browser with instant feedback and test cases.",
    },
    {
      icon: <Trophy className="h-6 w-6 text-green-400" />,
      title: "Progress Tracking",
      description:
        "Monitor your improvement with problem typed statistics and playlists.",
    },
  ];
  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-4xl">
                {" "}
                Love Leetcode
              </span>
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform is designed to help you master algorithms and ace
              technical interviews through deliberate practice and visual
              learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                data-index={index}
                className={`feature-card p-6  bg-gray-800/30 border border-gray-800 transform transition-all duration-700 hover:shadow-lg hover:shadow-indigo-500/10 ${getFeatureAnimation(
                  index,
                )}`}
              >
                <div className="h-12 w-12  bg-gray-800 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
