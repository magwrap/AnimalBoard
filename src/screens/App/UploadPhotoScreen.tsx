import Layout from "@/constants/Layout";
import * as React from "react";
import { Image, Platform, SafeAreaView, View, StatusBar } from "react-native";

interface UploadPhotoScreenProps {
  navigation: any;
  route: {
    params: {
      imageURL: string;
    };
  };
}

const UploadPhotoScreen: React.FC<UploadPhotoScreenProps> = ({
  navigation,
  route,
}) => {
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={{ uri: route.params.imageURL }}
        style={{
          width: Layout.window.width,
          height: Layout.window.width,
          flex: 1,
        }}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
    </SafeAreaView>
  );
};

export default UploadPhotoScreen;
