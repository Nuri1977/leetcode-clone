import TopBar from "@/components/TopBar/TopBar";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { getProblemDetail } from "@/lib/services";
import { problemsPaths } from "@/utils/problems";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

const ProblemPage = async (props: any) => {
  const { pid } = props.params as Params;
  const problemDB = await getProblemDetail(pid);
  const problem = problemsPaths[pid];
  problem.handlerFunction = problem.handlerFunction.toString();
  return (
    <div>
      <TopBar problemPage={true} />
      <WorkSpace problem={problem} problemDB={problemDB} />
    </div>
  );
};

export default ProblemPage;
