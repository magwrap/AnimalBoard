import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

type MyTextInputProps = Omit<TextInputProps, "theme">;

const MyTextInput: React.FC<MyTextInputProps> = (props) => {
  return (
    <View>
      <TextInput mode="flat" {...props} />
    </View>
  );
};
const styles = StyleSheet.create({});

export default MyTextInput;
