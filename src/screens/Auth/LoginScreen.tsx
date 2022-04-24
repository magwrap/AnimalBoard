import FacebookSignInButton from "@/components/Auth/FacebookSignInButton";
import GoogleSignInButton from "@/components/Auth/GoogleSignInButton";
import LoginButton from "@/components/Auth/LoginButton";
import ResetPassword from "@/components/Auth/ResetPassword";
import Center from "@/components/Center";
import MyModal from "@/components/MyCustoms/MyModal";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { AuthScreenNames } from "@/navigation/ScreenNames";
import { authStyles } from "@/styles/Auth/authStyles";
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
  Paragraph,
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
  const [visibleReset, setVisibleReset] = useState(false);
  const showResetPassModal = () => setVisibleReset(true);
  const hideResetPassModal = () => setVisibleReset(false);
  const _setEmail = (value: string) => {
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

  const { colors, roundness } = useTheme();
  const titleColor = { color: colors.primary };
  if (loading) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }
  const buttonProps = {
    loginCredentials,
    setLoginCredentials,
    setLoading,
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <View style={authStyles.top}>
        <View style={authStyles.titleContainer}>
          <Headline style={[authStyles.title, titleColor]}>
            Animal Board
          </Headline>
        </View>
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
              left={<TextInput.Icon name={"email"} />}
            />
            <MyTextInput
              label="Password"
              value={loginCredentials.password}
              onChangeText={_setPassword}
              secureTextEntry={!loginCredentials.showPassword}
              left={<TextInput.Icon name={"lock"} />}
              right={
                <TextInput.Icon
                  name={loginCredentials.showPassword ? "eye-off" : "eye"}
                  onPress={_toggleShowPassword}
                />
              }
              error={loginCredentials.error}
            />
          </View>
        </View>
        <LoginButton {...buttonProps} />
        <Button
          onPress={showResetPassModal}
          style={authStyles.resetPasswordButton}
          labelStyle={authStyles.resetPasswordButtonLabel}
          uppercase={false}
          color={colors.accent}
          compact>
          Don't rembember your password?
        </Button>
      </View>
      {loginCredentials.errorMessage ? (
        <Paragraph style={[authStyles.errorMessage, { color: colors.error }]}>
          {loginCredentials.errorMessage}
        </Paragraph>
      ) : null}
      <View style={authStyles.divider}>
        <Divider />
        <Caption style={{ textAlign: "center" }}>OR</Caption>
        <Divider />
      </View>
      <View>
        <GoogleSignInButton {...buttonProps} />
        <FacebookSignInButton {...buttonProps} />
      </View>
      <MyModal
        visible={visibleReset}
        showModal={showResetPassModal}
        hideModal={hideResetPassModal}
        children={<ResetPassword hideModal={hideResetPassModal} />}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
