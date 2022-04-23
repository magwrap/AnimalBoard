import { combineReducers } from "@reduxjs/toolkit";
import CurrentUserReducer from "./slices/CurrentUser";
import DarkThemeReducer from "./slices/DarkTheme";
import SnackBarReducer from "./slices/SnackBar";

const rootReducer = combineReducers({
  CurrentUserReducer,
  DarkThemeReducer,
  SnackBarReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
