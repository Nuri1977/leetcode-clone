import { db } from "@/config/firebase/firebaseConfig";
import { DBProblem } from "@/interfaces/problems";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

const useGetCurrentProblem = (problemId: string) => {
  const [currentProblem, setCurrentProblem] = React.useState<DBProblem | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] =
    React.useState<string>("");

  React.useEffect(() => {
    // Get problem from DB
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(db, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
        // easy, medium, hard
        setProblemDifficultyClass(
          problem.difficulty === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : " bg-dark-pink text-dark-pink"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
};

export default useGetCurrentProblem;
