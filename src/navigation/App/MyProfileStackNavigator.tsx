import MyHeader from "@/components/MyHeader";
import EditProfileScreen from "@/screens/App/MyProfileStack/EditProfileScreen";
import FriendsScreen from "@/screens/App/MyProfileStack/FriendsScreen";
import MyProfileScreen from "@/screens/App/MyProfileStack/MyProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AppScreenNames } from "../ScreenNames";
import MyProfilePostsScreen from "@/screens/App/MyProfileStack/MyProfilePostsScreen";

interface MyProfileStackNavigatorProps {}

const Stack = createStackNavigator();

const MyProfileStackNavigator: React.FC<
  MyProfileStackNavigatorProps
> = ({}) => {
  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: false }}
      screenOptions={{
        header: (props) => <MyHeader title={props.route.name} showBackButton />,
      }}
      initialRouteName={AppScreenNames.MYPROFILE_SCREEN}>
      <Stack.Screen
        options={{
          headerShown: false,
          // header: (props) => <MyHeader title={props.route.name} />,
        }}
        name={AppScreenNames.MYPROFILE_SCREEN}
        component={MyProfileScreen}
      />
      <Stack.Screen
        name={AppScreenNames.CUSTOMIZE_PROFILE_SCREEN}
        component={MyProfilePostsScreen}
      />
      <Stack.Screen
        name={AppScreenNames.EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={AppScreenNames.FRIENDS_SCREEN}
        component={FriendsScreen}
      />
    </Stack.Navigator>
  );
};

export default MyProfileStackNavigator;
