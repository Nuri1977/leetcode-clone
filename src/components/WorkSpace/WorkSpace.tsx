"use client";
import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import { Play } from "next/font/google";
import Playground from "./Playground/Playground";
import { Problem } from "@/interfaces/problems";

type Props = {
  problem: Problem;
};

const WorkSpace = ({ problem }: Props) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <Playground problem={problem} />
    </Split>
  );
};

export default WorkSpace;
