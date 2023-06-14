import React from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditotFooter/EditorFooter";
import TestCases from "./TestCases/TestCases";
import { Problem } from "@/interfaces/problems";

type Props = {
  problem: Problem;
};

const Playground = ({ problem }: Props) => {
  return (
    <div className="fleex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={problem.starterCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <TestCases problem={problem} />
      </Split>
      <EditorFooter />
    </div>
  );
};

export default Playground;
