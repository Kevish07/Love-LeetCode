import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

import RegisterPage from "./page/RegisterPage";
import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./page/AddProblem";
import ProblemPage from "./page/ProblemPage";

// import Test from "./components/mvpblocks/App-hero"
// import Test from "./page/ContactUs1"
// import Test from "./page/Auth"
import Auth from "./page/Auth"
import LandingPage from "./page/Landing"
import NewProblemPage from "./page/NewProblemPage";
import NewProblemSolver from "./page/NewProblemSolver"
import AllProblems from "./page/AllProblems";

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
    <div className="bg-black">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <LandingPage /> : <Navigate to={"/login"} />}
          />
          <Route
          path="/problems"
          element= {authUser ? <AllProblems /> : <Navigate to={"/login"} />}
        />
        </Route>

        <Route
          path="/solution"
          element= {<NewProblemSolver/>}
        />

        <Route
          path="/login"
          element={!authUser ? <Auth /> : <Navigate to={"/"} />}
        />

        <Route
          path="/register"
          element={!authUser ? <RegisterPage /> : <Navigate to={"/"} />}
        />

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
    </div>
  );
};

export default App;