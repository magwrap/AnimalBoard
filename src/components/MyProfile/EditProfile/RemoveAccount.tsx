import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { deleteUser, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Headline, Paragraph, useTheme } from "react-native-paper";

interface RemoveAccountProps {
  hideModal: () => void;
}

const randNum = Math.floor(Math.random() * 100 + 1);
const RemoveAccount: React.FC<RemoveAccountProps> = ({ hideModal }) => {
  const [num, setNum] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const errorColor = { color: colors.error };
  const _removeAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (randNum === +num && user) {
      Alert.alert(
        "WARNING",
        "Do you really want to premanently remove this account?",
        [
          { text: "NO", style: "cancel", onPress: hideModal },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              setLoading(true);
              deleteUser(user)
                .then(() => {
                  setLoading(false);
                })
                .catch((error) => {
                  setErrorMsg("Something went wrong...");
                  setLoading(false);
                });
            },
          },
        ],
        { cancelable: true, onDismiss: hideModal }
      );
    } else {
      setErrorMsg("numbers don't match");
    }
  };
  return (
    <View style={styles.container}>
      <Paragraph>Type in this number in order to remove this account</Paragraph>
      <Headline>{randNum}</Headline>
      <MyTextInput
        label="Number"
        keyboardType="number-pad"
        mode="outlined"
        value={num}
        onChangeText={setNum}
        error={errorMsg.length > 0}
      />
      <Paragraph style={[errorColor]}>{errorMsg}</Paragraph>
      <Button
        mode="contained"
        color={colors.error}
        onPress={_removeAccount}
        loading={loading}
        disabled={loading}>
        remove account
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

export default RemoveAccount;
