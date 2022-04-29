import React from "react";
import NotFoundScreen from "@/screens/App/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import UploadPhotoScreen from "@/screens/App/UploadPhotoScreen";
import { AppScreenNames } from "../ScreenNames";
import UserProfileScreen from "@/screens/App/UserProfileScreen";
import MyHeader from "@/components/Header/MyHeader";
import { createStackNavigator } from "@react-navigation/stack";
import EditPostScreen from "@/screens/App/EditPostScreen";
import ViewSnackBars from "@/components/SnackBars/ViewSnackBars";
import SearchUsersScreen from "@/screens/App/SearchUsersScreen";

interface AppStackNavigatorProps {}

const Stack = createStackNavigator();

const AppStackNavigator: React.FC<AppStackNavigatorProps> = ({}) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={AppScreenNames.ROOT}
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
          // fallbackscreen
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name={AppScreenNames.UPLOAD_PHOTO_SCREEN}
            component={UploadPhotoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={AppScreenNames.USER_PROFILE_SCREEN}
            component={UserProfileScreen}
            initialParams={{
              name: "Loading...",
              uid: "",
            }}
            options={{
              header: (props) => (
                <MyHeader
                  title={
                    props.route.params ? props.route.params.name : "Loading..."
                  }
                  showBackButton
                />
              ),
            }}
          />
          <Stack.Screen
            name={AppScreenNames.EDIT_POST_SCREEN}
            component={EditPostScreen}
            initialParams={{
              PostPath: "",
            }}
            options={{
              header: (props) => <MyHeader title="Editing..." showBackButton />,
            }}
          />
          <Stack.Screen
            name={AppScreenNames.SEARCH_USERS_SCREEN}
            component={SearchUsersScreen}
            options={{
              headerShown: false,
              gestureDirection: "horizontal",
              transitionSpec: {
                open: { animation: "timing", config: { duration: 0 } },
                close: {
                  animation: "spring",
                  config: {
                    stiffness: 1000,
                    damping: 500,
                    mass: 3,
                    overshootClamping: true,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                  },
                },
              },
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
      <ViewSnackBars />
    </>
  );
};

export default AppStackNavigator;
