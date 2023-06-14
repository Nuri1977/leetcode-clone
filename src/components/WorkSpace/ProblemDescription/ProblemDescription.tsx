import { Problem } from "@/interfaces/problems";
import React from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiFillStar,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";

type Props = {
  problem: Problem;
};

const ProblemDescription = ({ problem }: Props) => {
  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </div>
            </div>
            {/* {!loading && currentProblem && ( */}
            <div className="flex items-center mt-3">
              <div
                className={`inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
              >
                {"Easy"}
              </div>
              {/* {(solved || _solved) && ( */}
              <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                <BsCheck2Circle />
              </div>
              {/* )} */}
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                //   onClick={handleLike}
              >
                {/* {liked && !updating && ( */}
                <AiFillLike className="text-dark-blue-s" />
                {/* )} */}
                {/* {!liked && !updating && <AiFillLike />} */}
                {/* {updating && ( */}
                {/* <AiOutlineLoading3Quarters className="animate-spin" /> */}
                {/* )} */}

                <span className="text-xs">{"0"}</span>
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
                //   onClick={handleDislike}
              >
                {/* {disliked && !updating && ( */}
                <AiFillDislike className="text-dark-blue-s" />
                {/* )} */}
                {/* {!disliked && !updating && <AiFillDislike />} */}
                {/* {updating && ( */}
                {/* <AiOutlineLoading3Quarters className="animate-spin" /> */}
                {/* )} */}

                <span className="text-xs">{"2"}</span>
              </div>
              <div
                className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 "
                //   onClick={handleStar}
              >
                {/* {starred && !updating && ( */}
                <AiFillStar className="text-dark-yellow" />
                {/* )} */}
                {/* {!starred && !updating && <TiStarOutline />} */}
                {/* {updating && ( */}
                {/* <AiOutlineLoading3Quarters className="animate-spin" /> */}
                {/* )} */}
              </div>
            </div>
            {/* )} */}

            {/* {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )} */}

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className="font-medium text-white ">
                    Example {index + 1}:{" "}
                  </p>
                  {example.img && (
                    <img src={example.img} alt="" className="mt-3" />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{" "}
                      {example.inputText}
                      <br />
                      <strong>Output:</strong>
                      {example.outputText} <br />
                      {example.explanation && (
                        <>
                          <strong>Explanation:</strong> {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-8 pb-4">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc ">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.constraints }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
