import { Problem } from "@/interfaces/problems";
import React from "react";

// const problem = {
//   id: "1",
//   title: "Two Sum",
//   difficulty: "Easy",
//   category: "Array",
//   description:
//     "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//   examples: [
//     {
//       id: "1",
//       input: "[2,7,11,15]",
//       output: "9",
//     },
//     {
//       id: "2",
//       input: "[3,2,4]",
//       output: "6",
//     },
//     {
//       id: "3",
//       input: "[3,3]",
//       output: "6",
//     },
//   ],
// };

type Props = {
  problem: Problem;
};

const TestCases = ({ problem }: Props) => {
  const [activeTestCaseId, setActiveTestCaseId] = React.useState<number>(0);

  return (
    <div className="w-full px-5 overflow-auto">
      {/* testcase heading */}
      <div className="flex h-10 items-center space-x-6">
        <div className="relative flex h-full flex-col justify-center cursor-pointer">
          <div className="text-sm font-medium leading-5 text-white">
            Testcases
          </div>
          <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
        </div>
      </div>

      <div className="flex">
        {problem.examples.map((example, index) => (
          <div
            className="mr-2 items-start mt-2 "
            key={example.id}
            onClick={() => setActiveTestCaseId(index)}
          >
            <div className="flex flex-wrap items-center gap-y-4">
              <div
                className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                                  ${
                                    activeTestCaseId === index
                                      ? "text-white"
                                      : "text-gray-500"
                                  }
                              `}
              >
                Case {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="font-semibold my-4">
        <p className="text-sm font-medium mt-4 text-white">Input:</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {problem.examples[activeTestCaseId].inputText}
        </div>
        <p className="text-sm font-medium mt-4 text-white">Output:</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {problem.examples[activeTestCaseId].outputText}
        </div>
      </div>
    </div>
  );
};

export default TestCases;
