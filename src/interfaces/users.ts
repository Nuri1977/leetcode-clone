import { Timestamp } from "firebase/firestore";

export interface UserDB {
  uid: string;
  email: string | null;
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  likedProblems: string[];
  dislikedProblems: string[];
  solvedProblems: string[];
  starredProblems: string[];
}
