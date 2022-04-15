import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

interface MyTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: boolean;
  right?: React.ReactNode;
  errorMessage?: string;
}

const MyTextInput: React.FC<MyTextInputProps> = (props) => {
  return (
    <View>
      <TextInput mode="flat" {...props} />
    </View>
  );
};
const styles = StyleSheet.create({});

export default MyTextInput;
