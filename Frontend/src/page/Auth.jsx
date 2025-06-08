import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Github,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Star,
  Trophy,
  Brain,
  Target,
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
});

export default function AuthPage() {
  const { isLoggingIn, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error("Register failed", error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          },
        );
        console.log(res);
        const userData = {
          name: res.data.name,
          email: res.data.email,
          image: res.data.picture,
          password: res.data.sub, // Using Google ID as password for simplicity
        }
        onSubmit(userData)
      } catch (error) {
        console.log(error);
      }
    },
  });
  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    // Simulate social auth
    setTimeout(() => {
      setIsLoading(false);
      // Handle social auth logic here
    }, 1500);
  };

  const floatingIcons = [
    { icon: Code2, delay: 0, duration: 3 },
    { icon: Zap, delay: 0.5, duration: 4 },
    { icon: Star, delay: 1, duration: 3.5 },
    { icon: Trophy, delay: 1.5, duration: 4.5 },
    { icon: Brain, delay: 2, duration: 3.8 },
    { icon: Target, delay: 2.5, duration: 4.2 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${mousePosition.x * 0.015}px`,
            bottom: `${mousePosition.y * 0.015}px`,
            transform: "translate(50%, 50%)",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: "20%",
            top: "60%",
            animationDelay: "2s",
          }}
        />

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="absolute text-white/10"
              style={{
                left: `${10 + index * 15}%`,
                top: `${20 + index * 10}%`,
                animation: `float ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
              }}
            >
              <IconComponent className="w-8 h-8" />
            </div>
          );
        })}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Marketing Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-in-left">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-violet-300 text-sm font-medium">
                  Join Now
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-violet-200 to-emerald-200 bg-clip-text text-transparent">
                  Level Up DSA
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  Like Never Before
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Join the ultimate platform for Data Structures & Algorithms.
                Practice, compete, and land your dream job.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              {[
                {
                  icon: Shield,
                  text: "Access to Problems",
                  color: "text-emerald-400",
                },
                {
                  icon: Zap,
                  text: "Level up Skills",
                  color: "text-violet-400",
                },
                {
                  icon: Trophy,
                  text: "Customized problems",
                  color: "text-orange-400",
                },
                {
                  icon: Brain,
                  text: "Reference Solutions",
                  color: "text-pink-400",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                >
                  <div
                    className={`w-8 h-8 bg-${feature.color}-500/20 flex items-center justify-center`}
                  >
                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                  </div>
                  <span className="text-gray-300 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start space-x-8">
              {[
                { value: "2+", label: "Users" },
                { value: "10+", label: "Problems" },
                { value: "95%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center animate-fade-in-right">
            <Card className="w-full max-w-md bg-gray-900/50 border-gray-700/50 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-400">
                    Sign in to continue your problem solving journey
                  </p>
                </div>

                {/* Social Auth Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    onClick={() => googleLogin()}
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  {/* <Button
                    onClick={() => handleSocialAuth("github")}
                    disabled={isLoading}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Github className="w-5 h-5 mr-3" />
                    Continue with GitHub
                  </Button> */}
                </div>

                <div className="relative mb-6">
                  <Separator className="bg-gray-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-gray-900 px-3 text-gray-400 text-sm">
                      or
                    </span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email"
                        className={`pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-opacity-50 placeholder-gray-300 focus:border-violet-500 focus:ring-violet-500/20 ${
                          errors.email ? "input-error" : ""
                        }`}
                        required
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Enter your password"
                        className={`pr-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500/20  ${
                          errors.password ? "input-error" : ""
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoggingIn ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Toggle Form */}
                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      // className="ml-1 text-violet-400 hover:text-violet-300 font-medium transition-colors"
                    >
                      <button className="text-violet-400 hover:text-violet-300 font-medium transition-colors cursor-pointer">
                        Create an account
                      </button>
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
