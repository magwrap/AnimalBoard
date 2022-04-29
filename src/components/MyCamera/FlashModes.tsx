import React from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconSizes } from "@/styles/Fonts";
import { Colors } from "react-native-paper";
import { FlashMode } from "./MyCamera";
interface FlashModesProps {
  iconColor: string;
  setFlashMode: (mode: FlashMode) => void;
  cameraConfig: { flashMode: FlashMode; zoom: number };
}

enum FlashModesNames {
  AUTO = "auto",
  ON = "on",
  OFF = "off",
  TORCH = "torch",
}
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const FlashModes: React.FC<FlashModesProps> = ({
  iconColor,
  setFlashMode,
  cameraConfig,
}) => {
  return (
    <View style={styles.flashModes}>
      <TouchableOpacity
        onPress={() => setFlashMode(FlashModesNames.AUTO)}
        style={[
          styles.flashMode,
          {
            backgroundColor:
              cameraConfig.flashMode === FlashModesNames.AUTO
                ? Colors.amber500
                : "transparent",
          },
        ]}>
        <MaterialIcons
          name="flash-auto"
          size={IconSizes.NORMAL}
          color={iconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFlashMode(FlashModesNames.ON)}
        style={[
          styles.flashMode,
          {
            backgroundColor:
              cameraConfig.flashMode === FlashModesNames.ON
                ? Colors.amber500
                : "transparent",
          },
        ]}>
        <MaterialIcons
          name="flash-on"
          size={IconSizes.NORMAL}
          color={iconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFlashMode(FlashModesNames.OFF)}
        style={[
          styles.flashMode,
          {
            backgroundColor:
              cameraConfig.flashMode === FlashModesNames.OFF
                ? Colors.amber500
                : "transparent",
          },
        ]}>
        <MaterialIcons
          name="flash-off"
          size={IconSizes.NORMAL}
          color={iconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFlashMode(FlashModesNames.TORCH)}
        style={[
          styles.flashMode,
          {
            backgroundColor:
              cameraConfig.flashMode === FlashModesNames.TORCH
                ? Colors.amber500
                : "transparent",
          },
        ]}>
        <MaterialCommunityIcons
          name="flash-red-eye"
          size={IconSizes.NORMAL}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  flashModes: {
    marginTop: STATUS_BAR_HEIGHT,
    position: "absolute",
    left: "3%",
    top: "8%",
    justifyContent: "space-around",
    height: "30%",
  },
  flashMode: {
    borderRadius: 25,
    padding: 2.5,
  },
});

export default FlashModes;
