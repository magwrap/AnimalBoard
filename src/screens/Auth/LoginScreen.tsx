import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { AuthScreenNames } from "@/navigation/ScreenNames";
import { authStyles } from "@/styles/Auth/authStyles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Caption,
  Divider,
  Headline,
  Subheading,
  TextInput,
  Text,
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
    <SafeAreaView style={authStyles.container}>
      <View style={authStyles.top}>
        <Headline style={[authStyles.title, titleColor]}>Animal Board</Headline>
        <Subheading style={[authStyles.subheading]}>Sign In</Subheading>
        <Button
          onPress={_goToRegister}
          labelStyle={authStyles.goToButton}
          compact
          uppercase={false}
          color={colors.accent}>
          Don't have a account yet? Sign up
        </Button>
        <View>
          <View style={[authStyles.inputs, { borderRadius: roundness }]}>
            <MyTextInput
              label="Email"
              value={loginCredentials.email}
              onChangeText={_setEmail}
              error={loginCredentials.error}
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
              error={loginCredentials.error}
            />
          </View>
          <Button mode="contained" onPress={login}>
            Sign In
          </Button>
        </View>
      </View>
      {loginCredentials.errorMessage ? (
        <Text style={authStyles.errorMessage}>
          {loginCredentials.errorMessage}
        </Text>
      ) : null}
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

export default LoginScreen;
