import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { MaterialIcons } from "@expo/vector-icons";
import { IconSizes } from "@/styles/Fonts";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNames } from "@/navigation/ScreenNames";

interface ImagePickerButtonProps {
  iconColor: string;
}

const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({ iconColor }) => {
  const [image, setImage] = useState<ImageInfo["uri"] | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    console.log(image);
    if (image) {
      navigation.navigate(AppScreenNames.UPLOAD_PHOTO_SCREEN, {
        imageURL: image,
      });
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <IconButton
      icon={() => (
        <MaterialIcons
          name="photo-album"
          size={IconSizes.LARGE}
          color={iconColor}
        />
      )}
      onPress={pickImage}
    />
  );
};

export default ImagePickerButton;
