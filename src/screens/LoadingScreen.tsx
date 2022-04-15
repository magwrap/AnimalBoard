import Center from "@/components/Center";
import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = ({}) => {
  return (
    <Center>
      <MyActivityIndicator />
    </Center>
  );
};
const styles = StyleSheet.create({});

export default LoadingScreen;
