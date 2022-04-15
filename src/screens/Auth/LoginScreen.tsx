import Center from "@/components/Center";
import MyActivityIndicator from "@/components/MyActivityIndicator";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <Center>
      <MyActivityIndicator />
      <Text>Login Screen</Text>
    </Center>
  );
};
const styles = StyleSheet.create({});

export default LoginScreen;
