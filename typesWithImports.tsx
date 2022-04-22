import { Timestamp } from "firebase/firestore";

export type DBUserPost = {
  photoURL: string;
  title: string;
  description: string;
  creationDate: Timestamp;

  editionDate: Timestamp;
};
