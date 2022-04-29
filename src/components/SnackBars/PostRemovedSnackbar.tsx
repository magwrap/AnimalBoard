import {
  dismissRemoveSnackBar,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import React from "react";
import MySnackbar from "./MySnackBar";

interface PostRemovedSnackbarProps {}

const PostRemovedSnackbar: React.FC<PostRemovedSnackbarProps> = ({}) => {
  const visible = useAppSelector(
    (state) => state.SnackBarReducer.visibleRemove
  );
  const dispatch = useAppDispatch();
  const onDismissSnackBar = () => {
    dispatch(dismissRemoveSnackBar());
  };
  return (
    <MySnackbar
      text="Post Removed"
      visible={visible}
      onDismiss={onDismissSnackBar}
    />
  );
};

export default PostRemovedSnackbar;
