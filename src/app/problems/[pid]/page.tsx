import TopBar from "@/components/TopBar/TopBar";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import React from "react";

type Props = {};

const ProblemPage = (props: Props) => {
  return (
    <div>
      <TopBar problemPage={true} />
      <WorkSpace />
    </div>
  );
};

export default ProblemPage;
