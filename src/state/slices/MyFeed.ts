import { FirestoreCollectionNames } from "@/hooks/firebase/CollectionNames";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { DBUserPost, InitialMyFeedState, QueryDocUserPost } from "types";
import { RootState } from "../store";

const POSTS_PER_PAGE = 1;
const initialState: InitialMyFeedState = {
  myFeed: [],
  lastUserIndex: 0,
  lastUserPost: null,
  displayedPosts: POSTS_PER_PAGE,
};

const UserFeedSlice = createSlice({
  name: "My Feed",
  initialState,
  reducers: {
    pushToFeed: (state, action: PayloadAction<QueryDocUserPost>) => {
      state.myFeed.push(action.payload);
    },
    sortFeed: (state, action: PayloadAction<void>) => {
      state.myFeed.slice(state.displayedPosts).sort((x, y) => {
        return (
          y.data().editionDate.toMillis() - x.data().editionDate.toMillis()
        );
      });
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
    incrementDisplayedPosts: (state, action: PayloadAction<void>) => {
      state.displayedPosts += POSTS_PER_PAGE;
    },
  },
});
export const { incrementDisplayedPosts, sortFeed } = UserFeedSlice.actions;
const { pushToFeed, setLastUserIndex, setLastUserPost } = UserFeedSlice.actions;
export default UserFeedSlice.reducer;

export const fetchMyFeedThunk = (uid: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    try {
      const db = getFirestore();
      let postsNumber = 0;
      const myFollowing = state.MyFollowingReducer.myFollowing;

      const { myFeed, lastUserIndex, displayedPosts, lastUserPost } =
        state.MyFeedReducer;

      if (!myFollowing) {
        return;
      }
      console.log("lastindex: ", lastUserIndex);
      for (let i = lastUserIndex; i < myFollowing.length; i++) {
        const userPostsQuery: Query<DBUserPost> = query(
          collection(
            db,
            FirestoreCollectionNames.POSTS,
            myFollowing[i].id,
            FirestoreCollectionNames.USER_POSTS
          ),
          orderBy("editionDate", "desc")
          // limit(POSTS_PER_PAGE)
          //TODO:Dodac start after
          // lastUserPost ? startAfter(lastUserPost) : limit(100)
        );
        console.log(postsNumber);
        onSnapshot(userPostsQuery, (userPostsSnapshots) => {
          console.log(userPostsSnapshots.size);
          if (postsNumber >= POSTS_PER_PAGE) {
            dispatch(sortFeed());
            dispatch(setLastUserIndex(i));
            // dispatch(setLastUserPost(userPostItem));
            return;
          } //TODO: przeniesc tego if-a nizej, poprawic paging
          userPostsSnapshots.forEach((userPostItem) => {
            if (myFollowing[i].id !== uid && !myFeed.includes(userPostItem)) {
              dispatch(pushToFeed(userPostItem));
              console.log("pushing item: ", userPostItem.id);
              postsNumber++;
            }
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
