import TopBar from "@/components/TopBar/TopBar";
import React from "react";

type Props = {};

const ProblemPage = (props: Props) => {
  return (
    <div>
      <TopBar problemPage={true} />
    </div>
  );
};

export default ProblemPage;
