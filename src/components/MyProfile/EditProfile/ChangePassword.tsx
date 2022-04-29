import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { getAuth, updatePassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Button,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";

interface ChangePasswordProps {
  hideModal: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ hideModal }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState({
    show: false,
    text: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    show: false,
    text: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const errorColor = { color: colors.error, marginTop: 5 };

  const _setPassword = (text: string) =>
    setPassword({
      ...password,
      text,
    });
  const _toggleShowPassword = () =>
    setPassword({
      ...password,
      show: !password.show,
    });
  const _setConfirmPassword = (text: string) =>
    setConfirmPassword({
      ...confirmPassword,
      text,
    });
  const _toggleShowConfirmPassword = () =>
    setConfirmPassword({
      ...confirmPassword,
      show: !confirmPassword.show,
    });

  const _changePassword = () => {
    if (password.text.length < 8) {
      setError("password must be at lest 8 characters long");
    } else if (password.text === confirmPassword.text) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        updatePassword(user, password.text)
          .then(() => {
            setLoading(false);
            Alert.alert(
              "Your password has been changed!",
              "",
              [{ text: "OK", onPress: hideModal }],
              { cancelable: true, onDismiss: hideModal }
            );
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }
    } else {
      setError("Passwords doesn't match");
    }
  };
  return (
    <View style={styles.container}>
      <Title>Change Password</Title>
      <MyTextInput
        mode="outlined"
        label="New Password"
        value={password.text}
        onChangeText={_setPassword}
        secureTextEntry={!password.show}
        left={<TextInput.Icon name={"lock"} />}
        right={
          <TextInput.Icon
            name={password.show ? "eye-off" : "eye"}
            onPress={_toggleShowPassword}
          />
        }
        error={error.length > 0}
      />

      <MyTextInput
        mode="outlined"
        label="Confirm New Password"
        value={confirmPassword.text}
        onChangeText={_setConfirmPassword}
        secureTextEntry={confirmPassword.show}
        left={<TextInput.Icon name={"lock"} />}
        right={
          <TextInput.Icon
            name={confirmPassword.show ? "eye-off" : "eye"}
            onPress={_toggleShowConfirmPassword}
          />
        }
        error={error.length > 0}
      />
      <Paragraph style={errorColor}>{error}</Paragraph>
      <Button
        mode="contained"
        onPress={_changePassword}
        color={colors.accent}
        loading={loading}
        disabled={loading}>
        Submit Changes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: "5%",
  },
});

export default ChangePassword;
