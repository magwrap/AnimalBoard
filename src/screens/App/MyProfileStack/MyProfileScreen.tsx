import ViewProfileInfo from "@/components/PostsAndProfile/ViewProfileInfo";
import { useAppSelector } from "@/hooks/reduxHooks";
import { AppScreenNames } from "@/navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
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
  const auth = getAuth();

  const _goToMyProfileView = () => {
    if (auth.currentUser) {
      navigation.navigate(AppScreenNames.USER_PROFILE_SCREEN, {
        uid: auth.currentUser.uid,
      });
    }
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
        {currentUser?.avatar !== undefined && currentUser.displayName ? (
          <ViewProfileInfo {...currentUser} />
        ) : null}
      </View>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={_goToMyProfileView}>
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
