import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
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
import { photosRatio } from "@/config";
import Layout from "@/constants/Layout";
import { navigationStyles } from "@/styles/navigation";
import calculateResize from "./calculateResize";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

interface MyCameraProps {}

export type FlashMode = "auto" | "on" | "off" | "torch";

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const WINDOW_HEIGHT = Layout.window.height;
const WINDOW_WIDTH = Layout.window.width;
const { width: CAMERA_WIDTH, height: CAMERA_HEIGHT } = calculateResize(
  WINDOW_HEIGHT,
  WINDOW_WIDTH
);
//TODO: dodaj permissions
const MyCamera: React.FC<MyCameraProps> = ({}) => {
  const [statusCamera, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [statusMediaLib, requestMediaLibPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [errorMsg, setErrorMsg] = useState("");
  const cameraRef = useRef<Camera | null>(null);
  const [photoTaken, setPhotoTaken] = useState<CameraCapturedPicture | null>(
    null
  );
  const [cameraConfig, setCameraConfig] = useState<{
    flashMode: FlashMode;
    zoom: number;
  }>({ flashMode: "off", zoom: 0 });

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    requestCameraPermission();
    requestMediaLibPermission();
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
      const photo = await cameraRef.current?.takePictureAsync({
        isImageMirror: type === Camera.Constants.Type.front,
        skipProcessing: true,
      });
      FileSystem.copyAsync({ from: photo.uri, to: "photos" });
      setPhotoTaken(photo);
    }
  };

  const setFlashMode = (mode: FlashMode) => {
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

  if (statusCamera === null) {
    return (
      <Center>
        <MyActivityIndicator />
      </Center>
    );
  }
  if (statusCamera.granted === false) {
    return (
      <>
        <Text>No access to camera</Text>
        <Button onPress={requestPermissions}>Ask for permission again</Button>
      </>
    );
  }

  const iconColor = "white";
  return (
    <View style={styles.container}>
      <Camera
        ratio={photosRatio}
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
        <View style={styles.cameraInsides}>
          <View style={styles.statusBar} />
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
        </View>
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  camera: {
    height: CAMERA_HEIGHT,
    width: CAMERA_WIDTH,
  },
  cameraInsides: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - navigationStyles.bottomTabHeight,
  },
  bottomButtons: {
    position: "absolute",
    bottom: "0%",
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
