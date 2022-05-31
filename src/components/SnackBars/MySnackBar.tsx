import React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";

interface MySnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  text: string;
}
const MySnackbar: React.FC<MySnackbarProps> = ({
  visible,
  onDismiss,
  text,
}) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        // duration={1000000000000000}
        onDismiss={onDismiss}
        action={{
          label: "OK",
          onPress: onDismiss,
        }}>
        {text}
      </Snackbar>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 5,
    right: 0,
  },
});

export default MySnackbar;
