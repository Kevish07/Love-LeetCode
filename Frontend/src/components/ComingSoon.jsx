import {
  Clock,
  ArrowLeft,
  Code,
  Cpu,
  Database,
  Terminal,
  Zap,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ComingSoon = ({ feature }) => {
  {
    console.log(
      feature.objectives.map((item, idx) => {
        console.log(item);
      }),
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 relative overflow-hidden">
      {/* Animated Tech Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Code Elements */}
        <div
          className="absolute top-10 left-10 text-purple-400/20 text-6xl font-mono animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          {"</>"}
        </div>
        <div
          className="absolute top-32 right-20 text-blue-400/20 text-4xl font-mono animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        >
          const
        </div>
        <div
          className="absolute bottom-20 left-32 text-green-400/20 text-5xl font-mono animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        >
          function()
        </div>
        <div
          className="absolute top-1/2 right-10 text-yellow-400/20 text-3xl font-mono animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
        >
          return;
        </div>

        {/* Moving Tech Icons */}
        {/* <div className="absolute top-20 left-1/4 animate-pulse">
          <Code className="h-12 w-12 text-purple-400/30" />
        </div>
        <div className="absolute bottom-40 right-1/3 animate-pulse" style={{ animationDelay: '1s' }}>
          <Cpu className="h-10 w-10 text-blue-400/30" />
        </div>
        <div className="absolute top-1/3 left-20 animate-pulse" style={{ animationDelay: '2s' }}>
          <Database className="h-8 w-8 text-green-400/30" />
        </div>
        <div className="absolute top-40 right-1/4 animate-pulse" style={{ animationDelay: '0.8s' }}>
          <GitBranch className="h-9 w-9 text-cyan-400/30" />
        </div> */}
        <div
          className="absolute bottom-20 right-20 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          <Terminal className="h-14 w-14 text-yellow-400/30" />
        </div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Moving Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(90deg, #a855f7 1px, transparent 1px),
              linear-gradient(180deg, #a855f7 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Glowing Orbs
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div> */}
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        <div className="text-center max-w-md animate-fade-in">
          <div className="mb-8">
            {/* Neon Glowing Icon Container */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-6 shadow-lg shadow-purple-500/50">
                <Clock className="h-12 w-12 text-slate-900" />
              </div>
              <div
                className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
            </div>

            {/* Neon Title */}
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent ">
              {feature.title}
            </h1>
            <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6">
              Coming Soon
            </div>

            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              We're crafting something extraordinary.
              <span className="text-purple-400 font-semibold">
                {" "}
                {feature.title}
              </span>{" "}
              will revolutionize your coding experience!
            </p>
          </div>

          <div className="space-y-6">
            {/* Neon Feature Box */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm"></div>
              <div className="relative bg-slate-900/80 border-2 border-purple-500/30 p-6 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                  <h3 className="text-purple-400 font-bold text-lg">
                    Next-Gen Features
                  </h3>
                </div>
                <ul className="text-slate-300 text-sm space-y-2 text-left">
                  {feature.objectives.map((item, idx) => {
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      {item}
                    </li>;
                  })}
                  <li className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    Real-time collaboration with global developers
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    Advanced analytics & performance insights
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    ></div>
                    Immersive community & learning platform
                  </li>
                </ul>
              </div>
            </div>

            {/* Neon Back Button */}
            <Link to="/">
              <Button className="relative group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <ArrowLeft className="mr-2 h-4 w-4 relative z-10" />
                <span className="relative z-10">Back to Home</span>
              </Button>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400/50 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
