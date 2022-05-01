import DownloadButton from "@/components/CameraStack/DownloadButton";
import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import Layout from "@/constants/Layout";
import { addPostToDB } from "@/hooks/firebase/Posts/FirestorePostsCrud";
import { storeImage } from "@/hooks/firebase/Posts/StorageImages";
import { getUserFromDB } from "@/hooks/firebase/User/FirestoreUser";
import { useAppDispatch, toggleUploadSnackBar } from "@/hooks/reduxHooks";
import { AppScreenNames } from "@/navigation/ScreenNames";
import { MyColors } from "@/styles/ColorPallete";
import { IconSizes } from "@/styles/Fonts";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Alert,
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
  TextInput,
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
    state: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const timeOutRef = React.useRef<null | NodeJS.Timeout>(null);
  const goBackWithoutAskingRef = React.useRef(false);
  const progressRef = React.useRef(0);
  const image = { uri: route.params.imageURL };
  const navigation = useNavigation();
  const { roundness, colors } = useTheme();
  const disable = photoUploadState.state === "running";
  const dispatch = useAppDispatch();
  const goBackAlertTitle = "Warning";
  const goBackAlertDes = "Do you want do remove this post and leave?";

  useEffect(() => {
    if (photoUploadState.downloadURL) {
      (async () => {
        await addPostToDB(title, description, photoUploadState.downloadURL);
        goBackWithoutAskingRef.current = true;
        dispatch(toggleUploadSnackBar());
        _goBack();
      })();
    }
  }, [photoUploadState.downloadURL]);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        timeOutRef.current && clearTimeout(timeOutRef.current);
        e.preventDefault();
        if (goBackWithoutAskingRef.current) {
          navigation.dispatch(e.data.action);
        } else {
          Alert.alert(goBackAlertTitle, goBackAlertDes, [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Remove",
              style: "destructive",

              onPress: () => navigation.dispatch(e.data.action),
            },
          ]);
        }
      }),
    [navigation]
  );

  const setDownloadURL = (text: string) => {
    setPhotoUploadState({
      ...photoUploadState,
      downloadURL: text,
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

  const checkIfOver13 = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const user = await getUserFromDB(currentUser.uid);
      if (user) {
        const userBirthDate = user.birthDate.toDate();
        const userBirthYear = userBirthDate.setFullYear(
          userBirthDate.getFullYear()
        );
        const nowDate = new Date();
        const thirteenYearsFromNow = nowDate.setFullYear(
          nowDate.getFullYear() - 13
        );
        console.log(userBirthYear, thirteenYearsFromNow);
        return userBirthYear < thirteenYearsFromNow;
      }
    }
    return false;
  };

  const _goToProfileEdit = () => {
    navigation.navigate(AppScreenNames.EDIT_PROFILE_SCREEN, {
      shownChgNameDesBirth: true,
    });
  };

  const _uploadPhoto = async () => {
    const ifOver13 = await checkIfOver13();
    if (!ifOver13) {
      Alert.alert(
        "Hey!",
        "You have to be over 13 years old in order to upload photos! Check your account settings...",
        [
          {
            text: "Open profile settings",
            style: "default",
            onPress: _goToProfileEdit,
          },
          { text: "Ok", style: "cancel" },
        ]
      );
    } else if ((title || description) && ifOver13) {
      storeImage(
        image.uri,
        setDownloadURL,
        setPhotoDownloadState,
        setError,
        progressRef
      );
      timeOutRef.current = timeOut();
    } else {
      setErrorMsg("Post has to have at least title or description");
    }
  };

  const timeOut = () =>
    setTimeout(() => {
      setPhotoDownloadState("error");
      setError("Request timeout");
      Alert.alert(
        "Request Timeout",
        "Something went wrong while uploading photo, check if everything is fine with your internet connection.",
        [
          { text: "Ok", style: "cancel", onPress: () => {} },
          {
            text: "Try again",
            style: "default",

            onPress: () => _uploadPhoto(),
          },
        ]
      );
    }, 10000); //TODO: wydluzyc timeout do produkcji - 60 sekund?

  const uploadButtonBackground = {
    backgroundColor: disable ? Colors.grey400 : colors.primary,
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
          {errorMsg ? (
            <Paragraph style={[styles.errorMsg, styles.white]}>
              {errorMsg}
            </Paragraph>
          ) : (
            <Paragraph> </Paragraph>
          )}
          <View style={styles.inputs}>
            <MyTextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              maxLength={25}
              disabled={disable}
              placeholder="Give a title to this photo!"
              right={<TextInput.Affix text={`${title.length}/25`} />}
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
              style={[styles.uploadButton, uploadButtonBackground]}
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
          <Paragraph style={[styles.white, styles.uploadProgress]}>
            uploaded: {progressRef.current.toFixed(2)}%
          </Paragraph>
          <ProgressBar
            progress={progressRef.current / 100}
            style={styles.progressBar}
          />
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
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "2%",
  },
  uploadButton: {
    // margin: "1%",
    flex: 1,
  },
  inputs: {
    backgroundColor: MyColors.TRANSPARENT_BLACK,
    marginBottom: "2%",
  },
  uploadInfo: {
    position: "absolute",
    alignSelf: "center",
    top: "35%",
    padding: 25,
    width: "60%",
    backgroundColor: MyColors.TRANSPARENT_BLACK,
  },
  progressBar: { backgroundColor: Colors.grey500 },
  uploadProgress: { textAlign: "center" },
  errorMsg: {
    color: "black",
    textAlign: "center",
    backgroundColor: MyColors.TRANSPARENT_BLACK,
  },
  white: { color: Colors.white },
});

export default UploadPhotoScreen;
