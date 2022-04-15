import Center from "@/components/Center";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface MyProfileScreenProps {}

const MyProfileScreen: React.FC<MyProfileScreenProps> = ({}) => {
  return (
    <Center>
      <Text>My profile</Text>
    </Center>
  );
};
const styles = StyleSheet.create({});

export default MyProfileScreen;
