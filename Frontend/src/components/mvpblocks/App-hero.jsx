import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Database,
  Sparkles,
  Zap,
  ArrowUpRight,
} from "lucide-react";

import BlurText from "../BlurText/BlurText";
import { Link } from "react-router-dom";

export default function AppHero() {
  // State for animated counters
  const [stats, setStats] = useState({
    users: 0,
    submissions: 0,
    networks: 0,
  });

  // Animation to count up numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const newUsers = prev.users >= 5000 ? 5000 : prev.users + 100;
        const newSubmissions =
          prev.submissions >= 1200 ? 1200 : prev.submissions + 25;
        const newNetworks = prev.networks >= 150 ? 150 : prev.networks + 5;

        if (newUsers === 50000 && newSubmissions === 1200 && newNetworks === 150) {
          clearInterval(interval);
        }

        return {
          users: newUsers,
          submissions: newSubmissions,
          networks: newNetworks,
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Floating animation for the cube
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Rotation animation for the orbital ring
  const rotateAnimation = {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  };

  // Glowing effect animation
  const glowAnimation = {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Tooltip animation
  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 1.2,
      },
    },
  };

  // Badge pulse animation
  const badgePulse = {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black py-16 text-white sm:px-6 lg:px-8 lg:py-2">
      <div className="absolute inset-0 z-0 h-full w-full rotate-180 items-center px-5 py-24 opacity-80 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <svg
        id="noice"
        className="absolute inset-0 z-10 h-full w-full opacity-30"
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.34"
            numOctaves="4"
            stitchTiles="stitch"
          ></feTurbulence>
          <feColorMatrix type="saturate" values="0"></feColorMatrix>
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.46"></feFuncR>
            <feFuncG type="linear" slope="0.46"></feFuncG>
            <feFuncB type="linear" slope="0.47"></feFuncB>
            <feFuncA type="linear" slope="0.37"></feFuncA>
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.47" intercept="-0.23" />
            <feFuncG type="linear" slope="1.47" intercept="-0.23" />
            <feFuncB type="linear" slope="1.47" intercept="-0.23" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
      </svg>
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black/70 to-gray-950 blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Enhanced glow spots */}
        <div className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-purple-600/20 blur-[100px]"></div>
        <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-blue-600/20 blur-[100px]"></div>
        <motion.div
          animate={glowAnimation}
          className="absolute left-1/4 top-1/3 h-40 w-40 rounded-full bg-indigo-500/10 blur-[80px]"
        ></motion.div>
        <motion.div
          animate={glowAnimation}
          className="absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]"
        ></motion.div>

        {/* Particle effects - subtle dots */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="fadein-blur relative z-11 mx-auto mb-10 h-[300px] w-[300px] lg:absolute lg:right-1/2 lg:top-1/2 lg:mx-0 lg:mb-0 lg:h-[500px] lg:w-[500px] lg:-translate-y-2/3 lg:translate-x-1/2">
        <img
          src="https://blocks.mvp-subha.me/Adobe Express - file(1).png"
          alt="Nexus Platform 3D Visualization"
          className="h-full w-full object-contain drop-shadow-[0_0_35px_#3358ea85] transition-all duration-1000 hover:scale-110"
        />
        <motion.div
          variants={tooltipVariants}
          className="absolute -left-4 top-4  border border-purple-500/30 bg-black/80 p-2 backdrop-blur-md lg:-left-20 lg:top-1/4"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-medium text-purple-200">
              <BlurText
                text="Fast Enough"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-l"
              />
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={tooltipVariants}
          className="absolute -right-4 top-1/2  border border-blue-500/30 bg-black/80 p-2 backdrop-blur-md lg:-right-24"
        >
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium text-blue-200">
              <BlurText
                text="Database Ready"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-l"
              />
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={tooltipVariants}
          className="absolute bottom-4 left-4 border border-indigo-500/30 bg-black/80 p-2 backdrop-blur-md lg:bottom-1/4 lg:left-8"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-200">
              <BlurText
                text="Easy to Use"
                delay={250}
                animateBy="words"
                direction="top"
                className="text-l"
              />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mb-10 flex w-full max-w-[1450px] flex-grow flex-col items-center justify-center px-4 text-center sm:px-8 lg:mb-0 lg:items-start lg:justify-end lg:text-left"
      >
        <motion.div className="flex w-full flex-col items-center justify-between lg:flex-row lg:items-start">
          <div className="w-full lg:w-auto">
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
            >
              <span className="mr-2 rounded-full bg-purple-500 px-2 py-0.5 text-xs font-semibold text-white">
                New
              </span>
              The Ultimate DSA Platform
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 bg-gradient-to-r from-white/70 via-white to-slate-500/80 bg-clip-text text-3xl leading-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="text-6xl">
                Master Data Structures and Algorithms{" "}
                <br className="hidden sm:inline" />
              </span>
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-4xl">
                Ace Interviews, Build your Future.
              </span>
            </motion.h1>

            {/* Animated Stats Row */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex flex-wrap justify-center gap-4 md:gap-6 lg:justify-start"
            >
              <div className="border border-purple-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">
                  {stats.users.toLocaleString()}+
                </p>
                <p className="text-xs text-gray-400">Active Users</p>
              </div>
              <div className="border border-blue-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">
                  {stats.submissions.toLocaleString()}+
                </p>
                <p className="text-xs text-gray-400">Submissions</p>
              </div>
              <div className="border border-indigo-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">
                  {stats.networks}+
                </p>
                <p className="text-xs text-gray-400">Networks</p>
              </div>
            </motion.div>

            {/* Integration badges */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              <span className="text-xs font-medium text-gray-400">
                Integrates with:
              </span>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                Leetcode
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                Hacker Earth
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                Code Chef
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                +5 more
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-col items-center lg:mt-0 lg:items-end">
            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-md px-6 text-center text-lg leading-relaxed text-slate-300/90 lg:text-end"
            >
              Love Leetcode, giving
              developers the power to build beyond limits. One platform. Endless
              potential.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-col flex-wrap gap-4 sm:flex-row lg:justify-end"
            >
              <Link to="/problems">
                <Button
                  className="group rounded-full border-t border-purple-400 bg-gradient-to-b from-purple-700 to-slate-950/80 px-6 py-6 text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-purple-600/40 cursor-pointer"
                  size="lg"
                >
                  Start Solving Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/learn">
                <Button
                  variant="outline"
                  className="rounded-full border-purple-500/30 bg-transparent text-white hover:bg-purple-500/10 hover:text-white cursor-pointer"
                  size="lg"
                >
                  Explore Learning Paths
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mx-auto flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm lg:mx-0 lg:ml-auto"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800"
                  >
                    <div className="h-full w-full bg-gradient-to-br from-purple-500 to-blue-600 opacity-80">
                      <img src="https://avatar.iran.liara.run/public" alt="" />
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-300">
                <span className="font-semibold text-white">5000+</span>{" "}
                developers already building
              </span>
              <ArrowUpRight className="h-3 w-3 text-purple-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
      <div className="absolute -bottom-40 left-1/2 right-auto h-96 w-20 -translate-x-1/2 -rotate-45 rounded-full bg-gray-200/30 blur-[80px] lg:left-auto lg:right-96 lg:translate-x-0"></div>
      <div className="absolute -bottom-52 left-1/2 right-auto h-96 w-20 -translate-x-1/2 -rotate-45 rounded-full bg-gray-300/20 blur-[80px] lg:left-auto lg:right-auto lg:translate-x-0"></div>
      <div className="absolute -bottom-60 left-1/2 right-auto h-96 w-10 -translate-x-20 -rotate-45 rounded-full bg-gray-300/20 blur-[80px] lg:left-auto lg:right-96 lg:-translate-x-40"></div>
    </section>
  );
}
