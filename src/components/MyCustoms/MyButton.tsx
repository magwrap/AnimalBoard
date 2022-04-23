import { IconSizes } from "@/styles/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Colors, TouchableRipple, useTheme } from "react-native-paper";

interface MyButtonProps {
  text: string;
  func: () => void;
  iconName: string;
  bgcolor?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  text,
  func,
  iconName,
  bgcolor,
}) => {
  const { colors, roundness } = useTheme();
  const buttonColor = { backgroundColor: colors.primary };
  const borderRadius = { borderRadius: roundness };
  return (
    <TouchableRipple
      style={[
        styles.button,
        buttonColor,
        borderRadius,
        bgcolor ? { backgroundColor: bgcolor } : {},
      ]}
      onPress={func}>
      <>
        <Button mode="contained" compact>
          {text}
        </Button>
        <MaterialIcons
          name={iconName}
          size={IconSizes.HUGE}
          color={Colors.white}
        />
      </>
    </TouchableRipple>
  );
};
const styles = StyleSheet.create({
  button: {
    width: "97%",
    marginVertical: 3,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyButton;
