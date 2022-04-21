import DarkThemeSwitch from "@/components/MyProfile/DarkThemeSwitch";
import LogoutButton from "@/components/MyProfile/LogoutButton";
import ViewProfileInfo from "@/components/ViewProfileInfo";
import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Paragraph, Title } from "react-native-paper";

interface MyProfileScreenProps {}
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const MyProfileScreen: React.FC<MyProfileScreenProps> = ({}) => {
  const currentUser = useAppSelector(
    (state) => state.CurrentUserReducer.currentUser
  );
  console.log(currentUser);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {currentUser?.avatar !== undefined ? (
          <ViewProfileInfo
            {...{
              avatar: currentUser?.avatar,
              birthDate: currentUser?.birthDate,
              description: currentUser?.description,
              displayName: currentUser?.displayName,
            }}
          />
        ) : null}
      </View>
      <View>
        <DarkThemeSwitch />
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
    justifyContent: "space-between",
  },
});

export default MyProfileScreen;
