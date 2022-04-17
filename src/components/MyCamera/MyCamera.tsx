import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import MyActivityIndicator from "../MyCustoms/MyActivityIndicator";
import { Button, IconButton } from "react-native-paper";

import {
  CameraCapturedPicture,
  CameraMountError,
} from "expo-camera/build/Camera.types";
import { IconSizes } from "@/styles/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import FlashModes from "./FlashModes";
import ZoomSlider from "./ZoomSlider";
import PhotoModal from "./PhotoModal";
import ErrorMessage from "./ErrorMessage";
import Center from "../Center";
import ImagePickerButton from "./ImagePickerButton";

interface MyCameraProps {}

export type FlashMode = "auto" | "on" | "off" | "torch";

//TODO: dodac jakis safe zone zeby unikac status bar

const MyCamera: React.FC<MyCameraProps> = ({}) => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [errorMsg, setErrorMsg] = useState("");
  const cameraRef = useRef<Camera | null>(null);
  const [photoTaken, setPhotoTaken] = useState<CameraCapturedPicture | null>(
    {
      height: 50,
      width: 100,
      uri: "https://picsum.photos/200/200",
    }
    // null
  );
  const [cameraConfig, setCameraConfig] = useState<{
    flashMode: FlashMode;
    zoom: number;
  }>({ flashMode: "auto", zoom: 0 });

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

  const showError = (err: CameraMountError) => {
    setErrorMsg(err.message);
    setTimeout(() => setErrorMsg(""), 10000);
  };

  if (hasPermission === null) {
    return (
      <Center>
        <MyActivityIndicator />
      </Center>
    );
  }
  if (hasPermission === false) {
    return (
      <>
        <Text>No access to camera</Text>
        <Button onPress={requestForPermission}>Ask for permission again</Button>
      </>
    );
  }

  const iconColor = "white";
  return (
    <View style={styles.container}>
      <Camera
        ratio="1:1"
        style={styles.camera}
        type={type}
        ref={(ref) => {
          cameraRef.current = ref;
        }}
        // useCamera2Api={true}
        autoFocus={true}
        flashMode={cameraConfig.flashMode}
        zoom={cameraConfig.zoom}
        onMountError={showError}>
        <View style={styles.bottomButtons}>
          <View style={styles.openGalleryButtonContainer}>
            <ImagePickerButton iconColor={iconColor} />
          </View>
          <View style={[styles.takePictureButtonContainer]}>
            <TouchableOpacity
              style={styles.takePictureButton}
              onPress={takePicture}>
              <View style={[styles.innerTakePictureButton]} />
            </TouchableOpacity>
          </View>

          <View style={styles.flipButtonContainer}>
            <IconButton
              icon={() => (
                <MaterialIcons
                  name="flip-camera-ios"
                  size={IconSizes.NORMAL}
                  color={iconColor}
                />
              )}
              onPress={flipCamera}
            />
          </View>
        </View>
        <FlashModes
          iconColor={iconColor}
          setFlashMode={setFlashMode}
          cameraConfig={cameraConfig}
        />
        <ZoomSlider setZoomValue={setZoomValue} />
        <PhotoModal photoTaken={photoTaken} setPhotoTaken={setPhotoTaken} />
        <ErrorMessage message={errorMsg} />
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
    bottom: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  takePictureButtonContainer: {
    borderRadius: 25,
    height: 60,
    width: 60,
    backgroundColor: "white",
  },
  takePictureButton: { flex: 1 },
  innerTakePictureButton: {
    borderRadius: 20,
    margin: 7.5,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  openGalleryButtonContainer: {
    marginLeft: "3%",
  },
  flipButtonContainer: {
    marginRight: "3%",
  },
});

export default MyCamera;
