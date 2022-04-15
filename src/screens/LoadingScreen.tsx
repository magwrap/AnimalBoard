import Center from "@/components/Center";
import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = ({}) => {
  const { colors } = useTheme();
  const backgroundColor = {
    backgroundColor: colors.background,
  };
  return (
    <View style={[styles.container, backgroundColor]}>
      <Center>
        <MyActivityIndicator />
      </Center>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default LoadingScreen;
