import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import MyText from "@/components/MyCustoms/MyText";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { AuthScreenNames } from "@/navigation/ScreenNames";
import { MyColors } from "@/styles/ColorPallete";
import { FontSizes } from "@/styles/Fonts";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  Subheading,
  TextInput,
  Title,
  useTheme,
  Text,
} from "react-native-paper";
import { doc, GeoPoint, setDoc, Timestamp } from "firebase/firestore";
import { db, FirestoreCollectionNames } from "@/hooks/useFirebase";

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [registerCredentials, setRegisterCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    errorMessage: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const _setEmail = (value: string) => {
    setRegisterCredentials({ ...registerCredentials, email: value });
  };
  const _setPassword = (value: string) => {
    setRegisterCredentials({ ...registerCredentials, password: value });
  };
  const _setConfirmPassword = (value: string) => {
    setRegisterCredentials({ ...registerCredentials, confirmPassword: value });
  };

  const _toggleShowPassword = () => {
    setRegisterCredentials({
      ...registerCredentials,
      showPassword: !registerCredentials.showPassword,
    });
  };

  const _toggleShowConfirmPassword = () => {
    setRegisterCredentials({
      ...registerCredentials,
      showConfirmPassword: !registerCredentials.showConfirmPassword,
    });
  };
  const _goToLogin = () => {
    navigation.navigate(AuthScreenNames.LOGIN_SCREEN);
  };

  const register = () => {
    if (
      registerCredentials.email &&
      registerCredentials.password &&
      registerCredentials.password === registerCredentials.confirmPassword
    ) {
      setLoading(true);
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        registerCredentials.email,
        registerCredentials.password
      )
        .then(async (userCredential) => {
          const user = userCredential.user;
          // Add a new document in collection "cities"
          await setDoc(doc(db, FirestoreCollectionNames.USERS, user.uid), {
            email: user.email,
            displayName: user.displayName,
            description: "",
            avatar: user.photoURL,
            emailVerified: user.emailVerified,
            birthDate: Timestamp.fromDate(new Date()),
            location: new GeoPoint(0, 0),
          });

          setLoading(false);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setRegisterCredentials({
            ...registerCredentials,
            error: true,
            errorMessage,
          });
          setLoading(false);
        });
    } else {
      setRegisterCredentials({
        ...registerCredentials,
        error: true,
        errorMessage: "All fields must be filled",
      });
    }
  };

  const { colors, roundness } = useTheme();
  const titleColor = { color: colors.primary };

  if (loading) {
    return <MyActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Title style={[styles.title, titleColor]}>Animal Board</Title>
        <Subheading style={[styles.subheading]}>Sign Up</Subheading>
        <Button onPress={_goToLogin} labelStyle={styles.goToRegisterButton}>
          You DO have an account? Sign In
        </Button>
        <View>
          <View style={[styles.inputs, { borderRadius: roundness }]}>
            <MyTextInput
              label="Email"
              value={registerCredentials.email}
              onChangeText={_setEmail}
              error={registerCredentials.error}
            />
            <MyTextInput
              label="Password"
              value={registerCredentials.password}
              onChangeText={_setPassword}
              secureTextEntry={!registerCredentials.showPassword}
              right={
                <TextInput.Icon
                  name={registerCredentials.showPassword ? "eye-off" : "eye"}
                  onPress={_toggleShowPassword}
                />
              }
              error={registerCredentials.error}
            />

            <MyTextInput
              label="Confirm Password"
              value={registerCredentials.confirmPassword}
              onChangeText={_setConfirmPassword}
              secureTextEntry={!registerCredentials.showConfirmPassword}
              right={
                <TextInput.Icon
                  name={
                    registerCredentials.showConfirmPassword ? "eye-off" : "eye"
                  }
                  onPress={_toggleShowConfirmPassword}
                />
              }
              error={registerCredentials.error}
            />
          </View>
          <Button mode="contained" onPress={register}>
            Sign Up
          </Button>
        </View>
        {/* {registerCredentials.errorMessage ? (
          <MyText style={styles.errorMessage}>
            {registerCredentials.errorMessage}
          </MyText>
        ) : null} */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: { textAlign: "center", fontSize: FontSizes.HUGE },
  subheading: { textAlign: "center", fontSize: FontSizes.LARGE },
  goToRegisterButton: { fontSize: FontSizes.SMALL },
  inputs: { borderWidth: 1, margin: 5 },
  top: { justifyContent: "space-evenly" },
  errorMessage: { textAlign: "center", color: MyColors.WARNING },
});

export default RegisterScreen;
