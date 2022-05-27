import { combineReducers } from "@reduxjs/toolkit";
import CurrentUserReducer from "./slices/CurrentUser";
import DarkThemeReducer from "./slices/DarkTheme";
import SnackBarReducer from "./slices/SnackBar";
import MyFeedReducer from "./slices/MyFeed";
import MyFollowingReducer from "./slices/MyFollowing";

const rootReducer = combineReducers({
  CurrentUserReducer,
  DarkThemeReducer,
  SnackBarReducer,
  MyFeedReducer,
  MyFollowingReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
