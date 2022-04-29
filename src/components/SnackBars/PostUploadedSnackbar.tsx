import {
  dismissUploadSnackBar,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import React from "react";
import MySnackbar from "./MySnackBar";

interface PostUploadedSnackbarProps {}

const PostUploadedSnackbar: React.FC<PostUploadedSnackbarProps> = () => {
  const visible = useAppSelector(
    (state) => state.SnackBarReducer.visibleUpload
  );
  const dispatch = useAppDispatch();
  const onDismissSnackBar = () => {
    dispatch(dismissUploadSnackBar());
  };
  return (
    <MySnackbar
      text="Your photo has been uploaded"
      visible={visible}
      onDismiss={onDismissSnackBar}
    />
  );
};

export default PostUploadedSnackbar;
