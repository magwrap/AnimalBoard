import DownloadButton from "@/components/CameraStack/DownloadButton";
import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import Layout from "@/constants/Layout";
import { addPostToDB, storeImage } from "@/hooks/useFirebase";
import { MyColors } from "@/styles/ColorPallete";
import { IconSizes } from "@/styles/Fonts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Colors,
  IconButton,
  Paragraph,
  ProgressBar,
  useTheme,
} from "react-native-paper";

interface UploadPhotoScreenProps {
  navigation: any;
  route: {
    params: {
      imageURL: string;
    };
  };
}
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const IMAGE_HEIGHT = Layout.window.height;

const UploadPhotoScreen: React.FC<UploadPhotoScreenProps> = ({ route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [photoUploadState, setPhotoUploadState] = useState({
    downloadURL: "",
    progress: 0,
    state: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const image = { uri: route.params.imageURL };
  const navigation = useNavigation();
  const { roundness, colors } = useTheme();
  const disable = photoUploadState.state === "running";

  const goBackAlertTitle = "Warning";
  const goBackAlertDes = "Do you want do remove this post and leave?";

  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        Alert.alert(goBackAlertTitle, goBackAlertDes, [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Remove",
            style: "destructive",

            onPress: () => navigation.dispatch(e.data.action),
          },
        ]);
      }),
    [navigation]
  );

  useEffect(() => {
    if (photoUploadState.downloadURL) {
      console.log("photo uploaded: ", photoUploadState);
      (async () => {
        await addPostToDB(title, description, photoUploadState.downloadURL);
        photoUploadedInfoAlert();
      })();
    }
  }, [photoUploadState.downloadURL]);

  const photoUploadedInfoAlert = () => {
    Alert.alert(
      "Your photo has been uploaded!",
      "Click OK to leave this screen",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
          style: "default",
        },
      ]
    );
  };
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
    navigation.goBack();
  };

  const _uploadPhoto = () => {
    if (title || description) {
      storeImage(
        image.uri,
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
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.top}>
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
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentOffset={{ x: 0, y: IMAGE_HEIGHT }}>
          <View style={styles.bottom} />
          <View style={styles.inputs}>
            <MyTextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              maxLength={16}
              disabled={disable}
              placeholder="Give a title to this photo!"
            />
            <MyTextInput
              label="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              disabled={disable}
              placeholder="Describe this photo"
            />
            <Button
              mode="contained"
              style={styles.uploadButton}
              onPress={disable ? () => {} : _uploadPhoto}
              loading={disable}
              disabled={disable}
              color={disable ? Colors.grey500 : colors.primary}>
              Upload
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
      {photoUploadState.state === "running" ? (
        <View style={[styles.uploadInfo, { borderRadius: roundness }]}>
          <Paragraph style={{ color: MyColors.WARNING }}>{errorMsg}</Paragraph>
          <ProgressBar
            progress={photoUploadState.progress}
            indeterminate
            visible={photoUploadState.state === "running"}
          />
          <Paragraph style={{ color: Colors.white }}>
            {photoUploadState.progress} {"\n"}
            {photoUploadState.state === "running" ? "uploading..." : null}
          </Paragraph>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: { height: IMAGE_HEIGHT * 0.1 },
  bottom: { height: IMAGE_HEIGHT * 0.9 },
  goBackButton: {
    backgroundColor: MyColors.TRANSPARENT_BLACK,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
    // transform: [{ scaleX: -1 }],
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "2%",
  },
  uploadButton: {
    margin: "1%",
    flex: 1,
  },
  inputs: {
    backgroundColor: Colors.grey400,
  },
  uploadInfo: {
    position: "absolute",
    alignSelf: "center",
    top: "35%",
    padding: 25,
    width: "60%",
    alignItems: "center",
    backgroundColor: MyColors.TRANSPARENT_BLACK,
  },
});

export default UploadPhotoScreen;
