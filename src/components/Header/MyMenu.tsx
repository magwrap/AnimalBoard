import React from "react";
import { StyleSheet } from "react-native";
import { Menu, Divider, Appbar, Colors, useTheme } from "react-native-paper";
import DarkThemeSwitch from "../MyProfile/DarkThemeSwitch";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { IconSizes } from "@/styles/Fonts";
import * as Linking from "expo-linking";

interface MyMenuProps {
  visible: boolean;
  closeMenu: () => void;
  openMenu: () => void;
}

const MyMenu: React.FC<MyMenuProps> = ({ visible, closeMenu, openMenu }) => {
  const { colors } = useTheme();
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Appbar.Action
          icon="dots-vertical"
          onPress={openMenu}
          color={Colors.white}
        />
      }>
      <Menu.Item
        onPress={() => {
          Linking.openURL("https://pngtree.com/so/set");
        }}
        title="Set png from pngtree.com"
        icon={() => (
          <AntDesign
            name="infocirlce"
            size={IconSizes.NORMAL}
            color={colors.text}
          />
        )}
      />
      <Menu.Item
        onPress={() => {}}
        title="About Me"
        icon={() => (
          <FontAwesome
            name="comment"
            size={IconSizes.NORMAL}
            color={colors.text}
          />
        )}
      />
      <Divider />
      <DarkThemeSwitch />
    </Menu>
  );
};
const styles = StyleSheet.create({});

export default MyMenu;
