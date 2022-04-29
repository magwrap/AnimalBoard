import {
  dismissEditSnackBar,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import React from "react";
import MySnackbar from "./MySnackBar";

interface PostEditedSnackbarProps {}

const PostEditedSnackbar: React.FC<PostEditedSnackbarProps> = ({}) => {
  const visible = useAppSelector((state) => state.SnackBarReducer.visibleEdit);
  const dispatch = useAppDispatch();
  const onDismissSnackBar = () => {
    dispatch(dismissEditSnackBar());
  };
  return (
    <MySnackbar
      text="Changes Saved"
      visible={visible}
      onDismiss={onDismissSnackBar}
    />
  );
};

export default PostEditedSnackbar;
