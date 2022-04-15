import { StyleSheet } from "react-native";
import { MyColors } from "../ColorPallete";
import { FontSizes } from "../Fonts";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: "center",
  },
  subheading: {
    textAlign: "center",
    fontSize: FontSizes.LARGE,
    fontWeight: "bold",
  },
  goToButton: { fontSize: FontSizes.SMALL },
  inputs: { borderWidth: 1, margin: 5 },
  top: { justifyContent: "space-evenly" },
  errorMessage: {
    textAlign: "center",
    color: MyColors.WARNING,
    marginVertical: 10,
  },
});
