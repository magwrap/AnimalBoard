import React from "react";
import NotFoundScreen from "@/screens/App/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UploadPhotoScreen from "@/screens/App/UploadPhotoScreen";
import { AppScreenNames } from "../ScreenNames";
import UserProfileScreen from "@/screens/App/UserProfileScreen";
import MyHeader from "@/components/Header/MyHeader";
import PostUploadedSnackbar from "@/components/CameraStack/PostUploadedSnackbar";
import { createStackNavigator } from "@react-navigation/stack";

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
          {/* zewnetrzny poza tabsami */}
        </Stack.Group>
      </Stack.Navigator>
      <PostUploadedSnackbar />
    </>
  );
};

export default AppStackNavigator;
