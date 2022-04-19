import DownloadButton from "@/components/CameraStack/DownloadButton";
import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import Layout from "@/constants/Layout";
import { useAppSelector } from "@/hooks/reduxHooks";
import { addPostToDB, storeImage } from "@/hooks/useFirebase";
import { MyColors } from "@/styles/ColorPallete";
import { IconSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Colors, IconButton, Paragraph } from "react-native-paper";

interface UploadPhotoScreenProps {
  navigation: any;
  route: {
    params: {
      imageURL: string;
    };
  };
}
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const UploadPhotoScreen: React.FC<UploadPhotoScreenProps> = ({ route }) => {
  const [title, setTitle] = useState("a");
  const [description, setDescription] = useState("a");
  const [downloading, setDownloading] = useState(false);
  const [photoUploadState, setPhotoUploadState] = useState({
    downloadURL: "",
    progress: 0,
    state: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const image = { uri: route.params.imageURL };
  const navigation = useNavigation();

  useEffect(() => {
    addPostToDB(title, description, photoUploadState.downloadURL);
  }, [photoUploadState.downloadURL]);

  const setDownloadURL = (text: string) => {
    setPhotoUploadState({
      ...photoUploadState,
      downloadURL: text,
    });
  };

  const setPhotoDownloadProgress = (num: number) => {
    setPhotoUploadState({
      ...photoUploadState,
      progress: num,
    });
  };

  const setPhotoDownloadState = (text: string) => {
    setPhotoUploadState({
      ...photoUploadState,
      state: text,
    });
  };

  const setError = (text: string) => {
    setErrorMsg(text);
  };

  const _goBack = () => {
    Alert.alert(
      "Hey watch out!",
      "Do you want to delete this post draft?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => navigation.goBack(),

          style: "destructive",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const _uploadPhoto = () => {
    if (title || description) {
      storeImage(
        route.params.imageURL,
        setDownloadURL,
        setPhotoDownloadProgress,
        setPhotoDownloadState,
        setError
      );
    } else {
      setErrorMsg("Post has to have at least title or/and description");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}>
            <View style={styles.topButtons}>
              <IconButton
                icon="arrow-left"
                color={Colors.white}
                size={IconSizes.NORMAL}
                onPress={_goBack}
                style={styles.goBackButton}
              />
              {downloading ? (
                <MyActivityIndicator />
              ) : (
                <DownloadButton
                  uri={image.uri}
                  setDownloading={setDownloading}
                  color={Colors.white}
                  background
                />
              )}
            </View>
            <Paragraph>{errorMsg}</Paragraph>
            <Paragraph>{photoUploadState.progress}</Paragraph>
            <Paragraph>{photoUploadState.state}</Paragraph>
          </ImageBackground>
        </View>

        <MyTextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          maxLength={16}
        />
        <MyTextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Button
          mode="contained"
          style={styles.uploadButton}
          onPress={_uploadPhoto}>
          Upload
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  goBackButton: {
    backgroundColor: MyColors.TRANSPARENT_BLACK,
  },
  imageContainer: {
    width: "100%",
    height: Layout.window.height * 0.7,
  },
  image: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  uploadButton: {
    margin: "1%",
    flex: 1,
  },
});

export default UploadPhotoScreen;
