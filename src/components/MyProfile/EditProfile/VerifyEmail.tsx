import { getAuth, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Paragraph, Title, useTheme } from "react-native-paper";

interface VerifyEmailProps {
  hideModal: () => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ hideModal }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { colors } = useTheme();
  const _sendVerifyEmail = () => {
    if (currentUser) {
      setLoading(true);
      sendEmailVerification(currentUser).then(() => {
        setLoading(false);
        Alert.alert(
          "Done!",
          "An email has been sent to your mailbox",
          [{ text: "OK", onPress: hideModal }],
          { cancelable: true, onDismiss: hideModal }
        );
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Title>Email:</Title>
        <Paragraph>{currentUser?.email}</Paragraph>
        <Paragraph>
          Verified: {currentUser?.emailVerified ? "Yes" : "No"}
        </Paragraph>
      </View>
      <Button
        mode="contained"
        onPress={_sendVerifyEmail}
        color={colors.accent}
        loading={loading}>
        Verify Your Email
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginBottom: "5%" },
  text: { marginBottom: "5%" },
});

export default VerifyEmail;
