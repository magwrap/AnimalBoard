import React from "react";
import { StyleSheet } from "react-native";
import { Subheading } from "react-native-paper";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (message) {
    return <Subheading style={styles.message}>{message}</Subheading>;
  } else {
    return <></>;
  }
};
const styles = StyleSheet.create({
  message: {
    position: "absolute",
    alignSelf: "center",
    bottom: "20%",
    color: "white",
  },
});

export default ErrorMessage;
