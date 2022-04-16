import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AuthButtonProps } from "./AuthButtonProps";

const FacebookSignInButton: React.FC<AuthButtonProps> = ({}) => {
  return <Button>Sign In with Facebook</Button>;
};
const styles = StyleSheet.create({});

export default FacebookSignInButton;
