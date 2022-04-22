// import { Timestamp } from "firebase/firestore";

type InitialCurrentUserState = {
  currentUser: null | DBUser;
};

type DBUser = {
  avatar: string | null;
  birthDate: {
    nanoseconds: number;
    seconds: number;
  };
  description: string;
  displayName: string | null;
  email: string;
  emailVerified: boolean;
};

type InitialDarkThemeState = {
  isDarkTheme: boolean;
};
