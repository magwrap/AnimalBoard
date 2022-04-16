import { FirestoreCollectionNames } from "@/hooks/useFirebase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

let initialState: InitialCurrentUserState = {
  currentUser: null,
};

const CurrentUserSlice = createSlice({
  name: "Current User",
  initialState,
  reducers: {
    fetchUser: (state, action: PayloadAction<User["uid"]>) => {
      const db = getFirestore();
      const unsub = onSnapshot(
        doc(db, FirestoreCollectionNames.USERS, action.payload),
        (doc) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(source, "- current User: ", doc.data());

          return { currentUser: doc.data() };
        }
      );
    },
  },
});

export const { fetchUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
