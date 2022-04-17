import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { AppScreenNames } from "../ScreenNames";
import FreshScreen from "@/screens/App/FreshScreen";
import CameraScreen from "@/screens/App/CameraScreen";
import MyProfileScreen from "@/screens/App/MyProfileScreen";

const Tab = createMaterialBottomTabNavigator();

interface BottomTabNavigatorProps {}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName={AppScreenNames.FRESH_SCREEN}
      shifting={true}>
      <Tab.Screen
        name={AppScreenNames.FRESH_SCREEN}
        component={FreshScreen}
        options={{
          // tabBarLabel: "Tab1",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={AppScreenNames.CAMERA_SCREEN}
        component={CameraScreen}
        options={{
          // tabBarLabel: "Tab2",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={AppScreenNames.MYPROFILE_SCREEN}
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
