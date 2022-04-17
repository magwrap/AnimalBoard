import MyCamera from "@/components/Camera/MyCamera";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

interface CameraScreenProps {
  navigation: any;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  return (
    <View style={styles.container}>{isFocused ? <MyCamera /> : null}</View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default CameraScreen;
