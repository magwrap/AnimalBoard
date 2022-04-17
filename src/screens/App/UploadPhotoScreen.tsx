import Layout from "@/constants/Layout";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, Platform, View } from "react-native";
import { Paragraph } from "react-native-paper";

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
  console.log(route.params.imageURL);
  return (
    <View style={{ flex: 1 }}>
      <Paragraph>Modal</Paragraph>
      <Image
        source={{ uri: route.params.imageURL }}
        style={{
          width: Layout.window.width,
          height: Layout.window.width,
          flex: 1,
        }}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default UploadPhotoScreen;
