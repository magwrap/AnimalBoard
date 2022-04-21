import DarkThemeSwitch from "@/components/MyProfile/DarkThemeSwitch";
import LogoutButton from "@/components/MyProfile/LogoutButton";
import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import { Avatar } from "react-native-paper";

interface MyProfileScreenProps {}
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const MyProfileScreen: React.FC<MyProfileScreenProps> = ({}) => {
  const currentUser = useAppSelector(
    (state) => state.CurrentUserReducer.currentUser
  );
  console.log(currentUser);

  return (
    <SafeAreaView style={styles.container}>
      <View></View>

      <Title>My profie</Title>
      <DarkThemeSwitch />
      <LogoutButton />
      <Paragraph>{currentUser?.email}</Paragraph>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
  },
});

export default MyProfileScreen;
