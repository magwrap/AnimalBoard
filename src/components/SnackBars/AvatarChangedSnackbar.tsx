import {
  dismissAvatarChangeSnackBar,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import React from "react";
import MySnackbar from "./MySnackBar";

interface AvatarChangedSnackbarProps {}

const AvatarChangedSnackbar: React.FC<AvatarChangedSnackbarProps> = ({}) => {
  const visible = useAppSelector(
    (state) => state.SnackBarReducer.visibleAvatarChange
  );
  const dispatch = useAppDispatch();
  const onDismissSnackBar = () => {
    dispatch(dismissAvatarChangeSnackBar());
  };
  return (
    <MySnackbar
      text="Your avatar picture has been changed"
      visible={visible}
      onDismiss={onDismissSnackBar}
    />
  );
};

export default AvatarChangedSnackbar;
