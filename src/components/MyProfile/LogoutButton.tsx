import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const logout = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      setLoading(true);
      signOut(auth)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  return (
    <Button loading={loading} onPress={logout}>
      Sign Out
    </Button>
  );
};
const styles = StyleSheet.create({});

export default LogoutButton;
