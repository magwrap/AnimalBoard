import { FirestoreCollectionNames } from "@/hooks/useFirebase";
import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getAuth, User } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { RootState } from "../store";

let initialState: InitialCurrentUserState = {
  currentUser: null,
};

const CurrentUserSlice = createSlice({
  name: "Current User",
  initialState,
  reducers: {
    fetchUser: (state, action: PayloadAction<User["uid"]>) => {
      console.log("fetching user");
      const db = getFirestore();
      const unsub = onSnapshot(
        doc(db, FirestoreCollectionNames.USERS, action.payload),
        (doc) => {
          console.log(doc.data());
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
    const stateAfter = getState();
    console.log(`Counter after: ${stateAfter.DarkThemeReducer.isDarkTheme}`);
  };
};
// store.dispatch(logAndAdd(5))
