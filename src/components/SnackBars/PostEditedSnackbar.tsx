import {
  dismissRemoveSnackBar,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import React from "react";
import MySnackbar from "./MySnackBar";

interface PostEditedSnackbarProps {}

const PostEditedSnackbar: React.FC<PostEditedSnackbarProps> = ({}) => {
  const visible = useAppSelector(
    (state) => state.SnackBarReducer.visibleRemove
  );
  const dispatch = useAppDispatch();
  const onDismissSnackBar = () => {
    dispatch(dismissRemoveSnackBar());
  };
  return (
    <MySnackbar
      text="Post Edited"
      visible={visible}
      onDismiss={onDismissSnackBar}
    />
  );
};

export default PostEditedSnackbar;
