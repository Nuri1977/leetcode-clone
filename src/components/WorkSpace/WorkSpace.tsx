"use client";
import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import { Problem } from "@/interfaces/problems";
import { DBProblem } from "@/interfaces/problems";

type Props = {
  problem: Problem;
  problemDB: DBProblem | undefined;
};

const WorkSpace = ({ problem, problemDB }: Props) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} problemDB={problemDB} />
      <Playground problem={problem} problemDB={problemDB} />
    </Split>
  );
};

export default WorkSpace;
