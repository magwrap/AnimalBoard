import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import {
  Button,
  Caption,
  Colors,
  IconButton,
  useTheme,
} from "react-native-paper";
import { CameraCapturedPicture } from "expo-camera/build/Camera.types";
import Layout from "@/constants/Layout";
import { IconSizes } from "@/styles/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import FlashModes from "./FlashModes";
import ZoomSlider from "./ZoomSlider";

interface MyCameraProps {}

export type FlashMode = "auto" | "on" | "off" | "torch";

const MyCamera: React.FC<MyCameraProps> = ({}) => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [errorMsg, setErrorMsg] = useState("");
  const cameraRef = useRef<Camera | null>(null);
  const [photoTaken, setPhotoTaken] = useState<CameraCapturedPicture | null>(
    null
  );
  const [cameraConfig, setCameraConfig] = useState<{
    flashMode: FlashMode;
    zoom: number;
  }>({ flashMode: "auto", zoom: 0 });
  const { roundness, colors, dark } = useTheme();

  useEffect(() => {
    requestForPermission();
  }, []);

  const requestForPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current?.takePictureAsync();
      setPhotoTaken(photo);
    }
  };

  const setFlashMode = (mode: FlashMode) => {
    console.log(mode);
    setCameraConfig({
      ...cameraConfig,
      flashMode: mode,
    });
  };

  const setZoomValue = (value: number) => {
    setCameraConfig({
      ...cameraConfig,
      zoom: value,
    });
  };

  if (hasPermission === null) {
    return <MyActivityIndicator />;
  }
  if (hasPermission === false) {
    return (
      <>
        <Text>No access to camera</Text>
        <Button onPress={requestForPermission}>Ask for permission again</Button>
      </>
    );
  }

  const imageContainerRoundness = {
    borderRadius: roundness,
  };

  const imageTextColor = {
    color: colors.accent,
  };
  const iconColor = dark ? "black" : "white";
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          cameraRef.current = ref;
        }}
        useCamera2Api={true}
        autoFocus={true}
        flashMode={cameraConfig.flashMode}
        zoom={cameraConfig.zoom}
        // focusDepth={1}
        // ratio="4:3"
        onMountError={(err) => {
          setErrorMsg(err.message);
        }}>
        <View style={styles.bottomButtons}>
          <View style={styles.openGalleryButtonContainer}>
            <TouchableOpacity onPress={flipCamera}>
              <MaterialIcons
                name="photo-album"
                size={IconSizes.LARGE}
                color={iconColor}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.takePictureButtonContainer,
              { backgroundColor: dark ? "white " : "black" },
            ]}>
            <TouchableOpacity
              style={styles.takePictureButton}
              onPress={takePicture}>
              <View
                style={[
                  styles.innerTakePictureButton,
                  { backgroundColor: dark ? "black" : "white" },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.flipButtonContainer}>
            <TouchableOpacity onPress={flipCamera}>
              <MaterialIcons
                name="flip-camera-ios"
                size={IconSizes.NORMAL}
                color={iconColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlashModes
          iconColor={iconColor}
          setFlashMode={setFlashMode}
          cameraConfig={cameraConfig}
        />
        <ZoomSlider setZoomValue={setZoomValue} />
        {photoTaken && (
          <View style={[styles.imageContainer, imageContainerRoundness]}>
            <Image
              source={{ uri: photoTaken.uri }}
              // source={{ uri: "https://picsum.photos/200/200" }}
              style={styles.image}
            />
            <View style={styles.imageButtons}>
              <IconButton
                icon="close"
                size={IconSizes.NORMAL}
                color={colors.accent}
                onPress={() => setPhotoTaken(null)}
              />
              <Caption style={[styles.imageText, imageTextColor]}>
                Press on photo to upload it...
              </Caption>
              <IconButton
                icon="download"
                size={IconSizes.NORMAL}
                color={colors.accent}
              />
            </View>
          </View>
        )}
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },

  bottomButtons: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  takePictureButtonContainer: {
    borderRadius: 25,
    height: 60,
    width: 60,
  },
  takePictureButton: { flex: 1 },
  innerTakePictureButton: {
    borderRadius: 20,
    margin: 7.5,
    flex: 1,
  },
  flipButtonContainer: {
    marginRight: 15,
  },
  openGalleryButtonContainer: {
    marginLeft: 15,
  },

  imageContainer: {
    position: "absolute",
    alignSelf: "center",
    top: 20,
    width: Layout.window.width * 0.7,
    height: Layout.window.height * 0.4,
    backgroundColor: "rgba(50, 50, 50, 0.4)",
  },
  image: {
    height: "85%",
    width: "100%",
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageText: { textAlign: "center" },
});

export default MyCamera;
