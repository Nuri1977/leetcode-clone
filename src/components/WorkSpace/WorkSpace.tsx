"use client";
import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

type Props = {};

const WorkSpace = (props: Props) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <div>The code</div>
    </Split>
  );
};

export default WorkSpace;
