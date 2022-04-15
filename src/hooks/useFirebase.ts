import { getAnalytics } from "firebase/analytics";
import { app } from "App";
import { getFirestore } from "firebase/firestore";

export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export enum FirestoreCollectionNames {
  USERS = "users",
}
