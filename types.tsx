// import { Timestamp } from "firebase/firestore";

import { Timestamp } from "@firebase/firestore";

export type InitialCurrentUserState = {
  currentUser: null | DBUser;
};
export type InitialSnackBarState = {
  visible: boolean;
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
