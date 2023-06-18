import { db } from "@/config/firebase/firebaseConfig";
import { DBProblem } from "@/interfaces/problems";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getProblems = async () => {
  const querySnapshot = await getDocs(collection(db, "problems"));
  const newProblems: DBProblem[] = [];

  querySnapshot.forEach((doc) => {
    newProblems.push(doc.data() as DBProblem);
  });
  return newProblems.sort((a, b) => a.order - b.order);
};

export const getProblemDetail = async (pid: string) => {
  const docRef = doc(db, "problems", pid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as DBProblem;
  } else {
    // docSnap.data() will be undefined in this case
    return undefined;
  }
};
