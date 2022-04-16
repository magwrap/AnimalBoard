import Center from "@/components/Center";
import DarkThemeSwitch from "@/components/MyProfile/DarkThemeSwitch";
import LogoutButton from "@/components/MyProfile/LogoutButton";
import React from "react";
import { StyleSheet } from "react-native";
import { Title } from "react-native-paper";

interface MyProfileScreenProps {}

const MyProfileScreen: React.FC<MyProfileScreenProps> = ({}) => {
  return (
    <Center>
      <Title>My profie</Title>
      <DarkThemeSwitch />
      <LogoutButton />
    </Center>
  );
};
const styles = StyleSheet.create({});

export default MyProfileScreen;
