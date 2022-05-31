import React from "react";
import { StyleSheet, View } from "react-native";
import AvatarChangedSnackbar from "./AvatarChangedSnackbar";
import PhotoDownloadedSnackbar from "./PhotoDownloadedSnackbar";
import PostEditedSnackbar from "./PostEditedSnackbar";
import PostRemovedSnackbar from "./PostRemovedSnackbar";
import PostUploadedSnackbar from "./PostUploadedSnackbar";

interface ViewSnackBarsProps {}

const ViewSnackBars: React.FC<ViewSnackBarsProps> = ({}) => {
  return (
    <View>
      <PhotoDownloadedSnackbar />
      <PostUploadedSnackbar />
      <PostEditedSnackbar />
      <PostRemovedSnackbar />
      <AvatarChangedSnackbar />
    </View>
  );
};
const styles = StyleSheet.create({});

export default ViewSnackBars;
