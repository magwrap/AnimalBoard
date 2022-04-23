import { MyColors } from "@/styles/ColorPallete";
import { IconSizes } from "@/styles/Fonts";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  Colors,
  IconButton,
  Modal,
  Portal,
  useTheme,
} from "react-native-paper";

interface PhotoZoomModalProps {
  visible: boolean;
  hideModal: () => void;
  photoURL: string;
}

const PhotoZoomModal: React.FC<PhotoZoomModalProps> = ({
  visible,
  hideModal,
  photoURL,
}) => {
  const { colors, roundness } = useTheme();
  const roundEdges = { borderRadius: roundness };
  const background = { backgroundColor: colors.background };
  return (
    <Portal>
      <View style={styles.modalContainer}>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[styles.modal, roundEdges, background]}>
          <ImageBackground
            source={{ uri: photoURL }}
            style={[styles.image, roundEdges]}>
            <IconButton
              icon="arrow-left"
              color={Colors.white}
              size={IconSizes.NORMAL}
              onPress={hideModal}
              style={styles.goBackButton}
            />
          </ImageBackground>
        </Modal>
      </View>
    </Portal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modal: {
    padding: 10,
    margin: 10,
  },
  image: {
    height: "95%",
    width: "100%",
  },
  goBackButton: {
    backgroundColor: MyColors.TRANSPARENT_BLACK,
    margin: "3%",
  },
});

export default PhotoZoomModal;
