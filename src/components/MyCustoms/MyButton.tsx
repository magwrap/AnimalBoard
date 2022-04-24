import { IconSizes } from "@/styles/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Colors, TouchableRipple, useTheme } from "react-native-paper";

interface MyButtonProps {
  text: string;
  onPress: () => void;
  iconName: string;
  bgcolor?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  text,
  onPress,
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
      onPress={onPress}>
      <>
        <Button
          mode="contained"
          color={bgcolor ? bgcolor : ""}
          labelStyle={styles.buttonLabel}>
          {text}
        </Button>
        {iconName ? (
          <MaterialIcons
            name={iconName}
            size={IconSizes.HUGE}
            color={Colors.white}
          />
        ) : null}
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
  buttonLabel: { color: Colors.white },
});

export default MyButton;
