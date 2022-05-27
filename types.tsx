import { Timestamp } from "@firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";

export type QueryDocUserPost = QueryDocumentSnapshot<DBUserPost>;

export type QueryDocUser = QueryDocumentSnapshot<DBUser>;

export type QueryDocFollowing = QueryDocumentSnapshot<DBFollowing>;

export type InitialMyFeedState = {
  myFeed: QueryDocUserPost[];
  lastUserIndex: number;
  lastUserPost: null | QueryDocumentSnapshot<DBUserPost>;
  displayedPosts: number;
};

export type InitialMyFollowingState = {
  myFollowing: QueryDocFollowing[];
};

export type InitialCurrentUserState = {
  currentUser: null | DBUser;
};
export type InitialSnackBarState = {
  visibleUpload: boolean;
  visibleEdit: boolean;
  visibleRemove: boolean;
  visibleDownload: boolean;
};

export type InitialDarkThemeState = {
  isDarkTheme: boolean;
};

export type DBUserPost = {
  photoURL: string;
  title: string;
  description: string;
  creationDate: Timestamp;
  editionDate: Timestamp;
};
export type DBUser = {
  avatar: string | null;
  birthDate: Timestamp;
  description: string;
  displayName: string | null;
  email: string;
  emailVerified: boolean;
};

export type DBFollowing = {
  since: Timestamp;
};
