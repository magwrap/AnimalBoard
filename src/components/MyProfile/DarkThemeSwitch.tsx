import {
  toggleTheme,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Caption, Paragraph, Switch, useTheme } from "react-native-paper";

interface DarkThemeSwitchProps {}

const DarkThemeSwitch: React.FC<DarkThemeSwitchProps> = ({}) => {
  const theme = useTheme();
  const isThemeDark = useAppSelector(
    (state) => state.DarkThemeReducer.isDarkTheme
  );
  const dispatch = useAppDispatch();

  const _toggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <View style={styles.container}>
      <Paragraph style={styles.title}>Dark Mode: </Paragraph>
      <Switch
        color={theme.colors.primary}
        value={isThemeDark}
        onValueChange={_toggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: { textAlign: "right", justifyContent: "flex-end" },
});

export default DarkThemeSwitch;
