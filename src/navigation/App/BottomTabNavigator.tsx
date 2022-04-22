import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { AppScreenNames } from "../ScreenNames";
import FreshScreen from "@/screens/App/FreshScreen";
import CameraScreen from "@/screens/App/CameraScreen";
import MyProfileScreen from "@/screens/App/MyProfileStack/MyProfileScreen";
import { navigationStyles } from "@/styles/navigation";
import { useTheme } from "react-native-paper";
import AppStackNavigator from "./AppStackNavigator";
import MyProfileStackNavigator from "./MyProfileStackNavigator";
import { IconSizes } from "@/styles/Fonts";

const Tab = createMaterialBottomTabNavigator();

interface BottomTabNavigatorProps {}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName={AppScreenNames.FRESH_SCREEN}
      shifting={true}
      labeled={false}
      barStyle={{ height: navigationStyles.bottomTabHeight }}>
      <Tab.Screen
        name={AppScreenNames.FRESH_SCREEN}
        component={FreshScreen}
        options={{
          tabBarBadge: true,
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
