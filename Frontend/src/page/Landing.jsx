import React from "react";
import AppHero from "../components/mvpblocks/App-hero";
import WhyCode from "../components/WhyCode";
import LearningPath from "../components/LearningPath";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <>
      {/* <Navbar /> */}
      <AppHero />
      <div className="inset-0 z-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_20%,#000_50%,#63e_100%)]">
        <WhyCode />
        <LearningPath />
      </div>
    </>
  );
}
