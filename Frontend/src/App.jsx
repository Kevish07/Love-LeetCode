import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./page/AddProblem";

import Auth from "./page/Auth";
import LandingPage from "./page/Landing";
import NewProblemSolver from "./page/ProblemSolver";
import AllProblems from "./page/AllProblems";
import LearnPage from "./page/LearnPage";
import ContestPage from "./page/ContestPage";
import ContactUs from "./page/ContactUs";
import Dashboard from "./page/Dashboard";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/test" element={<LandingPage />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <LandingPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/problems"
            element={authUser ? <AllProblems /> : <Navigate to={"/login"} />}
          />
        </Route>

        <Route path="/learn" element={<LearnPage />} />
        <Route path="/contest" element={<ContestPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/login"
          element={!authUser ? <Auth /> : <Navigate to={"/"} />}
        />

        {/* <Route
          path="/register"
          element={!authUser ? <RegisterPage /> : <Navigate to={"/"} />}
        /> */}

        <Route
          path="/problem/:id"
          element={authUser ? <NewProblemSolver /> : <Navigate to={"/login"} />}
        />

        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
