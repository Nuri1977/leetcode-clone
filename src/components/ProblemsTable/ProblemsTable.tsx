"use client";
import React, { useEffect } from "react";
import { Problem, problems } from "@/data/problems";
import { BsCheckCircle } from "react-icons/bs";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import YouTube, { YouTubeProps } from "react-youtube";
import { IoClose } from "react-icons/io5";

type Props = {};

const ProblemsTable = (props: Props) => {
  const [showVideo, setShowVideo] = React.useState({
    isOpen: false,
    videoId: "",
  });

  const difficultyColor = (doc: Problem) => {
    switch (doc.difficulty) {
      case "Easy":
        return "text-dark-green-s";
      case "Medium":
        return "text-dark-yellow";
      case "Hard":
        return "text-dark-pink";
      default:
        return "text-gray-400";
    }
  };

  useEffect(() => {
    const handleEsccape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowVideo({ isOpen: false, videoId: "" });
      }
    };

    window.addEventListener("keydown", handleEsccape);

    return () => window.removeEventListener("keydown", handleEsccape);
  }, []);

  return (
    <>
      <tbody className="text-white">
        {problems.map((doc, index) => {
          return (
            <tr
              className={`${index % 2 == 1 ? "bg-dark-layer-1" : ""}`}
              key={doc.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s ">
                <BsCheckCircle fontSize={"18"} width={"18"} />
              </th>
              <td className="px-6 py4">
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${doc.id}`}
                >
                  {doc.title}
                </Link>
              </td>
              <td className={`px-6 py4 ${difficultyColor(doc)}`}>
                {doc.difficulty}
              </td>
              <td className="px-6 py4">{doc.category}</td>
              <td className="px-6 py4">
                {doc.videoId ? (
                  <AiFillYoutube
                    fontSize={"28"}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() =>
                      setShowVideo({ isOpen: true, videoId: doc.videoId || "" })
                    }
                  />
                ) : (
                  <p className="text-gray-400 ">Not available</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {showVideo.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={() =>
              setShowVideo({
                isOpen: false,
                videoId: "",
              })
            }
          ></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <IoClose
                  fontSize={"28"}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={() => setShowVideo({ isOpen: false, videoId: "" })}
                />
                <YouTube
                  videoId={showVideo.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};

export default ProblemsTable;
