import { db } from "@/config/firebase/firebaseConfig";
import { DBProblem } from "@/interfaces/problems";
import { collection, getDocs } from "firebase/firestore";

export const getProblems = async () => {
  const querySnapshot = await getDocs(collection(db, "problems"));
  const newProblems: DBProblem[] = [];

  querySnapshot.forEach((doc) => {
    newProblems.push(doc.data() as DBProblem);
  });
  return newProblems.sort((a, b) => a.order - b.order);
};
