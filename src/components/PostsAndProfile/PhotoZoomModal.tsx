import { MyColors } from "@/styles/ColorPallete";
import { IconSizes } from "@/styles/Fonts";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  Card,
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
  const { roundness } = useTheme();
  const roundEdges = { borderRadius: roundness };

  return (
    <Portal>
      <View style={styles.modalContainer}>
        <Modal visible={visible} onDismiss={hideModal}>
          <Card elevation={1} style={styles.modal}>
            <ImageBackground
              source={{ uri: photoURL }}
              style={[styles.image, roundEdges]}>
              {/* <IconButton
                icon="arrow-left"
                color={Colors.white}
                size={IconSizes.NORMAL}
                onPress={hideModal}
                style={styles.goBackButton}
              /> */}
            </ImageBackground>
          </Card>
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
    alignSelf: "center",
    height: "90%",
    width: "90%",
  },
  image: {
    flex: 1,
  },
  goBackButton: {
    backgroundColor: MyColors.TRANSPARENT_BLACK,
    margin: "3%",
  },
});

export default PhotoZoomModal;
