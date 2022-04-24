import React from "react";
import { StyleSheet, View } from "react-native";

interface MySeperatorProps {}

const MySeperator: React.FC<MySeperatorProps> = ({}) => {
  return <View style={styles.seperator} />;
};
const styles = StyleSheet.create({ seperator: { height: "1%" } });

export default MySeperator;
