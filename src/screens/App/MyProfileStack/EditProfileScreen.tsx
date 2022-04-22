import DarkThemeSwitch from "@/components/MyProfile/DarkThemeSwitch";
import LogoutButton from "@/components/MyProfile/LogoutButton";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";

interface EditProfileScreenProps {}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Paragraph>
        Zmiana hasla, weryfikacja emaila, zmiana nazwy, opisu, usuniecie konta
        (weryfikacja recaptcha?)
      </Paragraph>
      <DarkThemeSwitch />
      <LogoutButton />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default EditProfileScreen;
