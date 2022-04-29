import {
  dismissDownloadSnackBar,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import React from "react";

import MySnackbar from "./MySnackBar";

interface PhotoDownloadedSnackbarProps {}

const PhotoDownloadedSnackbar: React.FC<
  PhotoDownloadedSnackbarProps
> = ({}) => {
  const visible = useAppSelector(
    (state) => state.SnackBarReducer.visibleDownload
  );
  const dispatch = useAppDispatch();
  const onDismissSnackBar = () => {
    dispatch(dismissDownloadSnackBar());
  };
  return (
    <MySnackbar
      text="Photo Downloaded"
      visible={visible}
      onDismiss={onDismissSnackBar}
    />
  );
};

export default PhotoDownloadedSnackbar;
