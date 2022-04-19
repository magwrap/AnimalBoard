import Layout from "@/constants/Layout";

import { IconSizes } from "@/styles/Fonts";
import { CameraCapturedPicture } from "expo-camera/build/Camera.types";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Caption, IconButton, useTheme } from "react-native-paper";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNames } from "@/navigation/ScreenNames";
import { downloadPhoto } from "@/hooks/useMediaLibary";
import DownloadButton from "../CameraStack/DownloadButton";
import { MyColors } from "@/styles/ColorPallete";

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

interface PhotoModalProps {
  photoTaken: CameraCapturedPicture | null;
  setPhotoTaken: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | null>
  >;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  photoTaken,
  setPhotoTaken,
}) => {
  const [downloading, setDownloading] = useState(false);

  const { colors, roundness } = useTheme();
  const removePhoto = () => {
    setDownloading(false);
    setPhotoTaken(null);
  };
  const navigation = useNavigation();

  const goToUploadPhoto = () => {
    if (photoTaken?.uri) {
      navigation.navigate(AppScreenNames.UPLOAD_PHOTO_SCREEN, {
        imageURL: photoTaken.uri,
      });
    }
  };

  const imageContainerRoundness = {
    borderRadius: roundness,
  };

  const imageTextColor = {
    color: colors.accent,
  };
  if (photoTaken) {
    return (
      <View style={[styles.imageContainer, imageContainerRoundness]}>
        <TouchableOpacity
          style={styles.imageTouchable}
          onPress={goToUploadPhoto}>
          <Image source={{ uri: photoTaken.uri }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.imageButtons}>
          <IconButton
            icon="close"
            size={IconSizes.NORMAL}
            color={colors.accent}
            onPress={removePhoto}
          />
          <Caption style={[styles.imageText, imageTextColor]}>
            Press on photo to upload it...
          </Caption>

          {downloading ? (
            <MyActivityIndicator style={styles.activityIndicator} />
          ) : (
            <DownloadButton
              uri={photoTaken.uri}
              setDownloading={setDownloading}
            />
          )}
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};
const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    alignSelf: "center",
    top: STATUS_BAR_HEIGHT ? STATUS_BAR_HEIGHT + 20 : 30,
    width: Layout.window.width * 0.7,
    height: Layout.window.height * 0.4,
    backgroundColor: MyColors.TRANSPARENT_BLACK,
  },

  imageTouchable: {
    height: "85%",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityIndicator: { width: IconSizes.NORMAL, marginRight: 5 },
  imageText: { textAlign: "center" },
});

export default PhotoModal;
