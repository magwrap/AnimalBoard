import { AppScreenNames, AuthScreenNames } from "@/navigation/ScreenNames";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import MyButton from "@/components/MyCustoms/MyButton";

interface MyProfileScreenProps {}
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const MyProfileScreen: React.FC<MyProfileScreenProps> = ({}) => {
  const navigation = useNavigation();
  const auth = getAuth();
  const isFocused = navigation.isFocused();

  useEffect(() => {
    if (isFocused) {
      const profileStackTab = navigation.getParent();
      profileStackTab && profileStackTab.setOptions({ tabBarBadge: false });
    }
  }, [isFocused]);

  const _goToMyProfileView = () => {
    if (auth.currentUser) {
      navigation.navigate(AppScreenNames.USER_PROFILE_SCREEN, {
        uid: auth.currentUser.uid,
      });
    }
  };
  const _goToEditProfile = () => {
    //TODO: zautoryzuj najpierw
    // navigation.navigate(AppScreenNames.REAUTH_SCREEN);
    navigation.navigate(AppScreenNames.EDIT_PROFILE_SCREEN);
  };
  const _goToFriends = () => {
    navigation.navigate(AppScreenNames.FRIENDS_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <MyButton
          text="View My Profile"
          onPress={_goToMyProfileView}
          iconName="switch-account"
        />
        <MyButton
          text="My Profile Settings"
          onPress={_goToEditProfile}
          iconName="edit"
        />
        <MyButton
          text="View Friends"
          onPress={_goToFriends}
          iconName="supervisor-account"
        />
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
    flex: 1,
  },
});

export default MyProfileScreen;
