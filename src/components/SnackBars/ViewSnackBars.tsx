import React from "react";
import { StyleSheet, View } from "react-native";
import PhotoDownloadedSnackbar from "./PhotoDownloadedSnackbar";
import PostEditedSnackbar from "./PostEditedSnackbar";
import PostRemovedSnackbar from "./PostRemovedSnackbar";
import PostUploadedSnackbar from "./PostUploadedSnackbar";

interface ViewSnackBarsProps {}

const ViewSnackBars: React.FC<ViewSnackBarsProps> = ({}) => {
  //TODO: Dodać stakujące się snackbary?? czy zostawic jeden na drugim?
  //jesli maja stackouje sie to przekazujemy w argumentach bottom do pozycji i zwieksza sie z iloscia widocznych snackbarow
  return (
    <View>
      <PhotoDownloadedSnackbar />
      <PostUploadedSnackbar />
      <PostEditedSnackbar />
      <PostRemovedSnackbar />
    </View>
  );
};
const styles = StyleSheet.create({});

export default ViewSnackBars;
