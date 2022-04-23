import MyButton from "@/components/MyCustoms/MyButton";

import React from "react";
import { StyleSheet, View } from "react-native";

interface EditProfileScreenProps {}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <MyButton
        text="Change name/description"
        iconName=""
        func={() => {}}
        bgcolor="#35524a"
      />
      <MyButton
        text="Change password"
        iconName=""
        func={() => {}}
        bgcolor="#466441"
      />
      <MyButton
        text="Verify email/recaptcha"
        iconName=""
        func={() => {}}
        bgcolor="#96967d"
      />
      <MyButton text="Logout" iconName="" func={() => {}} bgcolor="#b86450" />
      <MyButton
        text="Remove account"
        iconName=""
        func={() => {}}
        bgcolor="#ef5350"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", alignItems: "center" },
});

export default EditProfileScreen;
