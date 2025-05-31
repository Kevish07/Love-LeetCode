import React from "react";
import ComingSoon from "../components/ComingSoon";

export default function ContestPage() {
  const options = {
    title: "Contest",
    objectives: [
      "Crafted Curriculum",
      "Beginner Friendly",
      "Immersive Solving Topics",
    ],
  };
  return (
    <>
      <ComingSoon feature={options} />
    </>
  );
}
