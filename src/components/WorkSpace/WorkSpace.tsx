"use client";
import React, { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import { Problem } from "@/interfaces/problems";
import { DBProblem } from "@/interfaces/problems";
import Confetti from "react-confetti";

type Props = {
  problem: Problem;
  problemDB: DBProblem | undefined;
};

const WorkSpace = ({ problem, problemDB }: Props) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [solved, setSolved] = useState(false);

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription
        problem={problem}
        problemDB={problemDB}
        solvedLocal={solved}
      />
      <div className="bg-dark-fill-2">
        <Playground
          problem={problem}
          problemDB={problemDB}
          setShowConfetti={setShowConfetti}
          setSolved={setSolved}
        />
        {showConfetti && <Confetti />}
      </div>
    </Split>
  );
};

export default WorkSpace;
