import Center from "@/components/Center";
import DarkThemeSwitch from "@/components/MyProfile/DarkThemeSwitch";
import LogoutButton from "@/components/MyProfile/LogoutButton";
import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { StyleSheet } from "react-native";
import { Paragraph, Title } from "react-native-paper";

interface MyProfileScreenProps {}

const MyProfileScreen: React.FC<MyProfileScreenProps> = ({}) => {
  const currentUser = useAppSelector(
    (state) => state.CurrentUserReducer.currentUser
  );
  return (
    <Center>
      <Title>My profie</Title>
      <DarkThemeSwitch />
      <LogoutButton />
      <Paragraph>{currentUser?.email}</Paragraph>
    </Center>
  );
};
const styles = StyleSheet.create({});

export default MyProfileScreen;
