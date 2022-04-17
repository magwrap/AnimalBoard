import MyCamera from "@/components/MyCamera/MyCamera";
import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
interface CameraScreenProps {
  navigation: any;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.container}>
      {isFocused ? <MyCamera /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default CameraScreen;
