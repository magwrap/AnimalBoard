import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialSnackBarState } from "types";

let initialState: InitialSnackBarState = {
  visible: false,
};

const SnackBarSlice = createSlice({
  name: "SnackBar",
  initialState,
  reducers: {
    toggleSnackBar: (state, action: PayloadAction<void>) => {
      state.visible = !state.visible;
    },
    dismissSnackBar: (state, action: PayloadAction<void>) => {
      state.visible = false;
    },
  },
});

export const { toggleSnackBar, dismissSnackBar } = SnackBarSlice.actions;
export default SnackBarSlice.reducer;
