import { FirestoreCollectionNames } from "@/hooks/firebase/CollectionNames";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { DBUserPost, InitialMyFeedState, QueryDocUserPost } from "types";
import { RootState } from "../store";

const POSTS_PER_PAGE = 1000;
const initialState: InitialMyFeedState = {
  myFeed: [],
  lastUserIndex: 0,
  endReached: false,
};

const UserFeedSlice = createSlice({
  name: "My Feed",
  initialState,
  reducers: {
    pushToFeed: (state, action: PayloadAction<QueryDocUserPost>) => {
      state.myFeed.push(action.payload);
    },

    setLastUserIndex: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        lastUserIndex: action.payload,
      };
    },
    setLastUserPost: (
      state,
      action: PayloadAction<QueryDocumentSnapshot<DBUserPost>>
    ) => {
      return {
        ...state,
        lastUserPost: action.payload,
      };
    },
    setEndReached: (state) => {
      state.endReached = true;
    },
  },
});
const { pushToFeed, setLastUserIndex, setEndReached } = UserFeedSlice.actions;
export default UserFeedSlice.reducer;

export const fetchMyFeedThunk = (uid: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    try {
      const db = getFirestore();
      let postsNumber = 0;
      const myFollowing = state.MyFollowingReducer.myFollowing;
      const endReached = state.MyFeedReducer.endReached;

      const { lastUserIndex } = state.MyFeedReducer;

      for (let i = lastUserIndex; i < myFollowing.length; i++) {
        if (!myFollowing || endReached) {
          return;
        }
        const userPostsQuery: Query<DBUserPost> = query(
          collection(
            db,
            FirestoreCollectionNames.POSTS,
            myFollowing[i].id,
            FirestoreCollectionNames.USER_POSTS
          ),
          orderBy("editionDate", "desc")
        );
        onSnapshot(userPostsQuery, (userPostsSnapshots) => {
          if (postsNumber >= POSTS_PER_PAGE) {
            dispatch(setLastUserIndex(i));
            return;
          }
          userPostsSnapshots.forEach((userPostItem) => {
            if (myFollowing[i].id !== uid) {
              dispatch(pushToFeed(userPostItem));
              postsNumber++;
            }
          });
        });
      }
      dispatch(setEndReached());
    } catch (err) {
      console.log(err);
    }
  };
};
