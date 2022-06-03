import { clearFeed, useAppDispatch } from "@/hooks/reduxHooks";
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

interface LogoutUserProps {
  hideModal: () => void;
}

const LogoutUser: React.FC<LogoutUserProps> = ({ hideModal }) => {
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const logout = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      Alert.alert(
        "Watch out!",
        "Do you really want to logout?",
        [
          { text: "NO", style: "cancel", onPress: hideModal },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              setLoading(true);
              signOut(auth)
                .then(() => {
                  dispatch(clearFeed());
                  setLoading(false);
                })
                .catch((error) => {
                  setLoading(false);
                });
            },
          },
        ],
        { cancelable: true, onDismiss: hideModal }
      );
    }
  };
  return (
    <View style={styles.container}>
      <Button
        loading={loading}
        disabled={loading}
        onPress={logout}
        mode="contained"
        color={colors.error}>
        Sign Out
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default LogoutUser;
