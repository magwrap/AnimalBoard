import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";
import { MyColors } from "../ColorPallete";
import { FontSizes } from "../Fonts";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.HUGE,
  },
  titleContainer: { marginVertical: 20 },
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
  signingButton: {
    marginVertical: 5,
  },
  resetPasswordButton: { alignSelf: "flex-end" },
  resetPasswordButtonLabel: {
    fontSize: FontSizes.SMALL - 2,
    fontWeight: "100",
    alignSelf: "baseline",
  },
  divider: {
    marginTop: "3%",
    marginBottom: "6%",
  },
});
