import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { AppScreenNames } from "../ScreenNames";
import FreshScreen from "@/screens/App/FreshScreen";
import CameraScreen from "@/screens/App/CameraScreen";
import { navigationStyles } from "@/styles/navigation";
import MyProfileStackNavigator from "./MyProfileStackNavigator";
import { IconSizes } from "@/styles/Fonts";
import { useAppSelector } from "@/hooks/reduxHooks";

const Tab = createMaterialBottomTabNavigator();

interface BottomTabNavigatorProps {}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({}) => {
  const [myProfileBadgeShown, setMyProfileBadgeShown] = useState(false);
  const [freshBadgeShow, setFreshBadgeShown] = useState(false);
  //TODO: pokazywac fesh badge kiedy nowe posty sa w fresh

  const snackBarVisible = useAppSelector(
    (state) => state.SnackBarReducer.visibleUpload
  );

  useEffect(() => {
    if (snackBarVisible) {
      setMyProfileBadgeShown(true);
    }
  }, [snackBarVisible]);
  return (
    <Tab.Navigator
      initialRouteName={AppScreenNames.CAMERA_SCREEN}
      shifting={true}
      labeled={false}
      barStyle={{ height: navigationStyles.bottomTabHeight }}>
      <Tab.Screen
        name={AppScreenNames.FRESH_SCREEN}
        component={FreshScreen}
        options={{
          tabBarBadge: freshBadgeShow,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={IconSizes.NORMAL}
            />
          ),
        }}
      />
      <Tab.Screen
        name={AppScreenNames.CAMERA_SCREEN}
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="camera"
              color={color}
              size={IconSizes.NORMAL}
            />
          ),
        }}
      />
      <Tab.Screen
        name={AppScreenNames.MYPROFILE_STACK}
        component={MyProfileStackNavigator}
        options={{
          tabBarBadge: myProfileBadgeShown,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={IconSizes.NORMAL}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
