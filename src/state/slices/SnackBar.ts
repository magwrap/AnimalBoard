import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialSnackBarState } from "types";

let initialState: InitialSnackBarState = {
  visibleUpload: false,
  visibleEdit: false,
  visibleRemove: false,
  visibleDownload: false,
  visibleAvatarChange: false,
};

const SnackBarSlice = createSlice({
  name: "SnackBar",
  initialState,
  reducers: {
    toggleUploadSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleUpload = !state.visibleUpload;
    },
    dismissUploadSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleUpload = false;
    },
    toggleEditSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleEdit = !state.visibleEdit;
    },
    dismissEditSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleEdit = false;
    },
    toggleRemoveSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleRemove = !state.visibleRemove;
    },
    dismissRemoveSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleRemove = false;
    },
    toggleDownloadSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleDownload = !state.visibleDownload;
    },
    dismissDownloadSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleDownload = false;
    },
    toggleAvatarChangeSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleAvatarChange = !state.visibleAvatarChange;
    },
    dismissAvatarChangeSnackBar: (state, action: PayloadAction<void>) => {
      state.visibleAvatarChange = false;
    },
  },
});

export const {
  toggleUploadSnackBar,
  dismissUploadSnackBar,
  toggleEditSnackBar,
  toggleRemoveSnackBar,
  toggleDownloadSnackBar,
  dismissEditSnackBar,
  dismissRemoveSnackBar,
  dismissDownloadSnackBar,
  toggleAvatarChangeSnackBar,
  dismissAvatarChangeSnackBar,
} = SnackBarSlice.actions;
export default SnackBarSlice.reducer;
