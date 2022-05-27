import { FirestoreCollectionNames } from "@/hooks/firebase/CollectionNames";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Query,
} from "firebase/firestore";
import { DBFollowing, InitialMyFollowingState, QueryDocFollowing } from "types";
import { RootState } from "../store";

const initialState: InitialMyFollowingState = {
  myFollowing: [],
};

const UserFeedSlice = createSlice({
  name: "My Following",
  initialState,
  reducers: {
    setFollowing: (state, action: PayloadAction<QueryDocFollowing[]>) => {
      return {
        myFollowing: action.payload,
      };
    },
  },
});

const { setFollowing } = UserFeedSlice.actions;
export default UserFeedSlice.reducer;

export const fetchMyFollowingThunk = (uid: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const db = getFirestore();
      const followingQuery: Query<DBFollowing> = query(
        collection(
          db,
          FirestoreCollectionNames.FOLLOWING,
          uid,
          FirestoreCollectionNames.USER_FOLLOWING
        ),
        orderBy("since", "asc")
      );

      const unsubscribe = onSnapshot(followingQuery, (followingSnapshots) => {
        const myFollowing: QueryDocFollowing[] = [];
        followingSnapshots.forEach((followingItem) => {
          myFollowing.push(followingItem);
        });
        dispatch(setFollowing(myFollowing));
      });
    } catch (err) {
      console.log(err);
    }
  };
};
