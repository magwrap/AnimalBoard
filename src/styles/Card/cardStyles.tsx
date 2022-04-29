import Layout from "@/constants/Layout";
import { StyleSheet } from "react-native";
const WINDOW_WIDTH = Layout.window.width;
export const cardStyles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  user: {},
  text: { marginVertical: 5 },
  cover: {
    height: WINDOW_WIDTH,
    width: WINDOW_WIDTH,
  },
  coverReplacement: {
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
  },

  actions: { justifyContent: "space-around" },

  crudButton: { marginHorizontal: 2 },
  crudButtons: { flexDirection: "row", marginRight: "1%" },
});
