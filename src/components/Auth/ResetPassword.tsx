import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Button,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import MyTextInput from "../MyCustoms/MyTextInput";

interface ResetPasswordProps {
  hideModal: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ hideModal }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { colors } = useTheme();
  const _sendEmail = () => {
    if (email) {
      const auth = getAuth();
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setLoading(false);
          Alert.alert(
            "Email has been sent!",
            "Check your email to finish resetting your password",
            [{ text: "OK", onPress: hideModal }],
            { cancelable: true, onDismiss: hideModal }
          );
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
          setLoading(false);
        });
    } else {
      setErrorMsg("Email field is empty...");
    }
  };
  return (
    <View style={styles.container}>
      <Title>Reset Password</Title>
      <MyTextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={errorMsg.length > 0}
        left={<TextInput.Icon name={"email"} />}
      />
      <Paragraph style={{ color: colors.error }}>{errorMsg}</Paragraph>
      <Button
        loading={loading}
        onPress={_sendEmail}
        mode="contained"
        disabled={loading}>
        Send reset email
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginBottom: "5%" },
});

export default ResetPassword;
