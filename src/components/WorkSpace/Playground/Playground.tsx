import React, { useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditotFooter/EditorFooter";
import TestCases from "./TestCases/TestCases";
import { DBProblem, Problem } from "@/interfaces/problems";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/config/firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { problemsPaths } from "@/utils/problems";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

type Props = {
  problem: Problem;
  problemDB: DBProblem | undefined;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground = ({
  problem,
  problemDB,
  setShowConfetti,
  setSolved,
}: Props) => {
  const [user] = useAuthState(auth);
  const { pid } = useParams();
  const [userCode, setUserCode] = useLocalStorage(
    `code-${pid}`,
    problem.starterCode
  );

  const hadleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      try {
        const callBackFn = new Function(`return ${userCode}`)();
        const result = problemsPaths[pid as string].handlerFunction(callBackFn);
        if (result) {
          toast.success("Congratulations! All tests passed", {
            position: "top-center",
            autoClose: 3000,
          });
          setShowConfetti(true);
          setSolved(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 4000);
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(pid),
          });
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: false,
        });
      }
    }
  };
  const handleOnCodeChange = (value: string) => {
    setUserCode(value);
  };

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
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
            onChange={handleOnCodeChange}
          />
        </div>
        <TestCases problem={problem} problemDB={problemDB} />
      </Split>
      <EditorFooter handleSubmit={hadleSubmit} />
    </div>
  );
};

export default Playground;
