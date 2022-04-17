import Layout from "@/constants/Layout";
import { addPhotoToLibary } from "@/hooks/useMediaLibary";
import { IconSizes } from "@/styles/Fonts";
import { CameraCapturedPicture } from "expo-camera/build/Camera.types";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  Caption,
  IconButton,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNames } from "@/navigation/ScreenNames";

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

  const downloadPhoto = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);
    if (!permission.granted) {
      try {
        console.log("asking");
        const response = await MediaLibrary.requestPermissionsAsync();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    if (photoTaken && permission.granted) {
      setDownloading(true);
      console.log(photoTaken.uri);
      try {
        addPhotoToLibary(photoTaken.uri).then(() => {
          setDownloading(false);
        });
      } catch (error) {
        setDownloading(false);
      }
    }
  };

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
            <IconButton
              icon="download"
              size={IconSizes.NORMAL}
              color={colors.accent}
              onPress={downloadPhoto}
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
    top: 20,
    width: Layout.window.width * 0.7,
    height: Layout.window.height * 0.4,
    backgroundColor: "rgba(50, 50, 50, 0.4)",
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
