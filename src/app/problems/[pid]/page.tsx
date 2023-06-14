import TopBar from "@/components/TopBar/TopBar";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { problemsPaths } from "@/utils/problems";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

const ProblemPage = ({ params: { pid } }: Params) => {
  const problem = problemsPaths[pid];
  problem.handlerFunction = problem.handlerFunction.toString();
  return (
    <div>
      <TopBar problemPage={true} />
      <WorkSpace problem={problem} />
    </div>
  );
};

export default ProblemPage;

export const getStaticPaths = async () => {
  const paths = Object.keys(problemsPaths).map((key) => ({
    params: {
      pid: key,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
