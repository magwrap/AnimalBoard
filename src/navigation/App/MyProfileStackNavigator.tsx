import MyHeader from "@/components/Header/MyHeader";
import EditProfileScreen from "@/screens/App/MyProfileStack/EditProfileScreen";
import FriendsScreen from "@/screens/App/MyProfileStack/FriendsScreen";
import MyProfileScreen from "@/screens/App/MyProfileStack/MyProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AppScreenNames } from "../ScreenNames";

interface MyProfileStackNavigatorProps {}

const Stack = createStackNavigator();

const MyProfileStackNavigator: React.FC<
  MyProfileStackNavigatorProps
> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <MyHeader title={props.route.name} showBackButton />,
      }}
      initialRouteName={AppScreenNames.MYPROFILE_SCREEN}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={AppScreenNames.MYPROFILE_SCREEN}
        component={MyProfileScreen}
      />
      <Stack.Screen
        name={AppScreenNames.EDIT_PROFILE_SCREEN}
        options={{
          header: (props) => (
            <MyHeader title={props.route.name} showBackButton more />
          ),
        }}
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
