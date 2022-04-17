import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { Caption, useTheme } from "react-native-paper";

interface ZoomSliderProps {
  setZoomValue: (value: number) => void;
}
//TODO: strasznie laguje prawie nie dziala
const ZoomSlider: React.FC<ZoomSliderProps> = ({ setZoomValue }) => {
  const { colors, dark } = useTheme();
  const maxTrackTintColor = dark ? "black" : "white";
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.25}
        onValueChange={setZoomValue}
        minimumTrackTintColor={maxTrackTintColor}
        maximumTrackTintColor="#EEEEEE"
        thumbTintColor={colors.primary}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",

    top: "5%",
    right: -100,
    height: 250,
    width: 250,
  },
  slider: {
    width: "100%",
    height: "100%",

    transform: [{ rotate: "-90deg" }],
  },
});

export default ZoomSlider;
