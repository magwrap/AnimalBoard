import { IconSizes } from "@/styles/Fonts";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, IconButton, Modal, Portal, useTheme } from "react-native-paper";

interface MyModalProps {
  visible: boolean;
  showModal: () => void;
  hideModal: () => void;
}
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const MyModal: React.FC<MyModalProps> = ({
  visible,
  showModal,
  hideModal,
  children,
}) => {
  const { colors, roundness } = useTheme();
  const headerStyle = {
    backgroundColor: colors.primary,
    borderTopLeftRadius: roundness,
    borderTopRightRadius: roundness,
  };

  const ModalHeader = () => (
    <View style={[styles.header, headerStyle]}>
      <IconButton icon="close" size={IconSizes.NORMAL} onPress={hideModal} />
    </View>
  );
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <Card style={styles.card}>
          <ModalHeader />
          <Card.Content>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}>
              {children}
            </ScrollView>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    marginTop: STATUS_BAR_HEIGHT,
    maxHeight: "90%",
    minHeight: "10%",
    width: "80%",
  },
  scrollView: {
    maxHeight: "95%",
  },
  container: {
    padding: 5,
  },
  header: {
    width: "100%",
    height: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MyModal;
