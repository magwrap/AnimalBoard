import MyText from "@/components/MyCustoms/MyText";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { AuthScreenNames } from "@/navigation/ScreenNames";
import { MyColors } from "@/styles/ColorPallete";
import { FontSizes } from "@/styles/Fonts";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Caption,
  Divider,
  Subheading,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";

interface LoginScreenProps {
  navigation: any;
}
//TODO: upiększyć
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
    error: false,
    errorMessage: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const _setEmail = (value: string) => {
    console.log("email: ", value);
    setLoginCredentials({ ...loginCredentials, email: value });
  };
  const _setPassword = (value: string) => {
    setLoginCredentials({ ...loginCredentials, password: value });
  };
  const _toggleShowPassword = () => {
    setLoginCredentials({
      ...loginCredentials,
      showPassword: !loginCredentials.showPassword,
    });
  };
  const _goToRegister = () => {
    navigation.navigate(AuthScreenNames.REGISTER_SCREEN);
  };

  const login = () => {
    if (loginCredentials.email && loginCredentials.password) {
      setLoading(true);

      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        loginCredentials.email,
        loginCredentials.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("logged in: ", user);

          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoginCredentials({
            ...loginCredentials,
            error: true,
            errorMessage,
          });
          setLoading(false);
        });
    } else {
      setLoginCredentials({
        ...loginCredentials,
        error: true,
        errorMessage: "All fields must be filled",
      });
    }
  };

  const { colors, roundness } = useTheme();
  const titleColor = { color: colors.primary };
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Title style={[styles.title, titleColor]}>Animal Board</Title>
        <Subheading style={[styles.subheading]}>Sign In</Subheading>
        <Button
          onPress={_goToRegister}
          labelStyle={styles.goToRegisterButton}
          compact>
          Don't have a account yet? Sign up
        </Button>
        <View>
          <View style={[styles.inputs, { borderRadius: roundness }]}>
            <MyTextInput
              label="Email"
              value={loginCredentials.email}
              onChangeText={_setEmail}
            />
            <MyTextInput
              label="Password"
              value={loginCredentials.password}
              onChangeText={_setPassword}
              secureTextEntry={!loginCredentials.showPassword}
              right={
                <TextInput.Icon
                  name={loginCredentials.showPassword ? "eye-off" : "eye"}
                  onPress={_toggleShowPassword}
                />
              }
            />
          </View>
          <Button mode="contained" onPress={login}>
            Sign In
          </Button>
        </View>
      </View>
      {/* {loginCredentials.errorMessage ? (
        <MyText style={styles.errorMessage}>
          {loginCredentials.errorMessage}
        </MyText>
      ) : null} */}
      <Divider />
      <Caption style={{ textAlign: "center" }}>OR</Caption>
      <Divider />
      <View>
        <Button>Sign In with Facebook</Button>
        <Button>Sign In with Google</Button>
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
  subheading: {
    textAlign: "center",
    fontSize: FontSizes.LARGE,
    fontWeight: "bold",
  },
  goToRegisterButton: { fontSize: FontSizes.SMALL },
  inputs: { borderWidth: 1, margin: 5 },
  top: { justifyContent: "space-evenly" },
  errorMessage: { textAlign: "center", color: MyColors.WARNING },
});

export default LoginScreen;
