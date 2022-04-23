import {
  dismissSnackBar,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";

interface PostUploadedSnackbarProps {}

const PostUploadedSnackbar: React.FC<PostUploadedSnackbarProps> = () => {
  const visible = useAppSelector((state) => state.SnackBarReducer.visible);
  const dispatch = useAppDispatch();
  const onDismissSnackBar = () => {
    dispatch(dismissSnackBar());
  };
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "OK",
          onPress: onDismissSnackBar,
        }}
        // action={{
        //   label: "View",
        //   onPress: () => {
        //     //TODO: dodac przekierowanie do edit mode
        //   },
        // }}
      >
        Your photo has been uploaded
      </Snackbar>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",

    bottom: "2%",
    right: 0,
  },
});

export default PostUploadedSnackbar;
