import MyButton from "@/components/MyCustoms/MyButton";

import React from "react";
import { StyleSheet, View } from "react-native";

interface EditProfileScreenProps {}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <MyButton text="Change name/description" iconName="" func={() => {}} />
      <MyButton text="Change password" iconName="" func={() => {}} />
      <MyButton text="Verify email/recaptcha" iconName="" func={() => {}} />
      <MyButton text="Logout" iconName="" func={() => {}} />
      <MyButton text="Remove account" iconName="" func={() => {}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between" },
});

export default EditProfileScreen;
