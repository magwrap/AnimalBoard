import { FirestoreCollectionNames } from "@/hooks/firebase/CollectionNames";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { DBUser, InitialCurrentUserState } from "types";
import { RootState } from "../store";

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
          return { currentUser: doc.data() };
        }
      );
    },
    setCurrentUser: (state, action: PayloadAction<DBUser>) => {
      return { currentUser: action.payload };
    },
  },
});

export const { setCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;

export const fetchUserThunk = (uid: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const db = getFirestore();
    const unsub = onSnapshot(
      doc(db, FirestoreCollectionNames.USERS, uid),
      (doc) => {
        const fetchedUser = doc.data();
        if (fetchedUser && fetchedUser !== undefined) {
          dispatch(setCurrentUser(fetchedUser));
        }
      }
    );
  };
};
