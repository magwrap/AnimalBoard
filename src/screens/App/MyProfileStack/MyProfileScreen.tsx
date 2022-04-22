import ViewProfileInfo from "@/components/ViewProfileInfo";
import { useAppSelector } from "@/hooks/reduxHooks";
import { AppScreenNames } from "@/navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

interface MyProfileScreenProps {}
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const MyProfileScreen: React.FC<MyProfileScreenProps> = ({}) => {
  const currentUser = useAppSelector(
    (state) => state.CurrentUserReducer.currentUser
  );

  const navigation = useNavigation();

  const _goToCustomizeProfile = () => {
    navigation.navigate(AppScreenNames.CUSTOMIZE_PROFILE_SCREEN);
  };
  const _goToEditProfile = () => {
    navigation.navigate(AppScreenNames.EDIT_PROFILE_SCREEN);
  };
  const _goToFriends = () => {
    navigation.navigate(AppScreenNames.FRIENDS_SCREEN);
  };

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
      <View style={styles.buttons}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={_goToCustomizeProfile}>
          My Profile
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={_goToEditProfile}>
          Edit Profile
        </Button>
        <Button mode="contained" style={styles.button} onPress={_goToFriends}>
          Friends
        </Button>
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
  buttons: {
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  button: {
    width: "97%",
    marginVertical: 3,
    flex: 1,
  },
});

export default MyProfileScreen;
