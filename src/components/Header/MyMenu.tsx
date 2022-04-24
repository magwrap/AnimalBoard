import React from "react";
import { StyleSheet } from "react-native";
import { Menu, Divider, Appbar, Colors } from "react-native-paper";
import DarkThemeSwitch from "../MyProfile/DarkThemeSwitch";

interface MyMenuProps {
  visible: boolean;
  closeMenu: () => void;
  openMenu: () => void;
}

const MyMenu: React.FC<MyMenuProps> = ({ visible, closeMenu, openMenu }) => {
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
      <Menu.Item onPress={() => {}} title="Item 2" />
      <Menu.Item onPress={() => {}} title="Item 3" />
      <Divider />
      <DarkThemeSwitch />
    </Menu>
  );
};
const styles = StyleSheet.create({});

export default MyMenu;
