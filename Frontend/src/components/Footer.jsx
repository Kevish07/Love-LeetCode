
import { Code2, Github, Twitter, Linkedin, Zap, Target, Trophy } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2.5 rounded-xl">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Love Leetcode
                </span>
                <div className="px-2 py-1 bg-purple-500/20 rounded-lg">
                  <Zap className="w-3 h-3 text-purple-400" />
                </div>
              </div>
            </div>
            <p className="text-slate-300 max-w-md mb-6">
              Master coding through structured learning paths, solve challenging problems, and build your programming expertise with our comprehensive platform.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-slate-800/50 rounded-lg hover:bg-purple-500/20 transition-colors cursor-pointer group">
                <Github className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <div className="p-2 bg-slate-800/50 rounded-lg hover:bg-purple-500/20 transition-colors cursor-pointer group">
                <Twitter className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <div className="p-2 bg-slate-800/50 rounded-lg hover:bg-purple-500/20 transition-colors cursor-pointer group">
                <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Learning Paths */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Target className="h-4 w-4 mr-2 text-purple-400" />
              Learning Paths
            </h3>
            <ul className="space-y-2">
              <li><a href="/learn" className="text-slate-300 hover:text-purple-400 transition-colors text-sm">Coding Rookie</a></li>
              <li><a href="/learn" className="text-slate-300 hover:text-purple-400 transition-colors text-sm">Code Explorer</a></li>
              <li><a href="/learn" className="text-slate-300 hover:text-purple-400 transition-colors text-sm">Algorithm Architect</a></li>
              <li><a href="/learn" className="text-slate-300 hover:text-purple-400 transition-colors text-sm">Coding Champion</a></li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-purple-400" />
              Platform
            </h3>
            <ul className="space-y-2">
              <li><a href="/problems" className="text-slate-300 hover:text-purple-400 transition-colors text-sm">Practice Problems</a></li>
              <li><a href="/dashboard" className="text-slate-300 hover:text-purple-400 transition-colors text-sm">Dashboard</a></li>
              <li><a href="/learn" className="text-slate-300 hover:text-purple-400 transition-colors text-sm">Structured Learning</a></li>
              <li><a href="/profile" className="text-slate-300 hover:text-purple-400 transition-colors text-sm">Progress Tracking</a></li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-purple-500/20 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">500+</div>
              <div className="text-sm text-slate-400">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">50K+</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">100+</div>
              <div className="text-sm text-slate-400">Topics Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-slate-400">Learning Support</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-slate-400">© 2025 Love Leetcode. All rights reserved. Empowering developers worldwide.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
