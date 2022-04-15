import Center from "@/components/Center";
import LogoutButton from "@/components/MyProfile/LogoutButton";
import React from "react";
import { StyleSheet } from "react-native";
import { Title } from "react-native-paper";

interface MyProfileScreenProps {}

const MyProfileScreen: React.FC<MyProfileScreenProps> = ({}) => {
  return (
    <Center>
      <Title>My profie</Title>
      <LogoutButton />
    </Center>
  );
};
const styles = StyleSheet.create({});

export default MyProfileScreen;
