import { auth, db } from "@/config/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useGetUsersDataOnProblem = (problemId: string) => {
  const [data, setData] = React.useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);

  React.useEffect(() => {
    const getUsersDataOnProblem = async () => {
      const userRef = doc(db, "users", user!.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
        });
      }
    };

    if (user) getUsersDataOnProblem();
    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemId, user]);

  return { ...data, setData };
};

export default useGetUsersDataOnProblem;
