import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { AuthScreenNames } from "@/navigation/ScreenNames";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import {
  Button,
  Subheading,
  TextInput,
  useTheme,
  Text,
  Caption,
  Headline,
  Paragraph,
} from "react-native-paper";
import DatePicker from "@/components/MyProfile/EditProfile/DatePicker";
import { authStyles } from "@/styles/Auth/authStyles";
import Center from "@/components/Center";

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
    if (registerCredentials.email && registerCredentials.password) {
      if (
        registerCredentials.password === registerCredentials.confirmPassword
      ) {
        setLoading(true);
        const auth = getAuth();
        createUserWithEmailAndPassword(
          auth,
          registerCredentials.email,
          registerCredentials.password
        )
          .then(async () => {
            // setLoading(false);
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
          errorMessage: "Passwords doesn't match",
        });
      }
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
    return (
      <Center>
        <MyActivityIndicator />
      </Center>
    );
  }
  return (
    <SafeAreaView style={authStyles.container}>
      <View style={authStyles.top}>
        <View style={authStyles.titleContainer}>
          <Headline style={[authStyles.title, titleColor]}>
            Animal Board
          </Headline>
        </View>
        <Subheading style={[authStyles.subheading]}>Sign Up</Subheading>
        <Button
          onPress={_goToLogin}
          labelStyle={authStyles.goToButton}
          compact
          uppercase={false}
          color={colors.accent}>
          You DO have an account? Sign In
        </Button>
        <View>
          <View style={[authStyles.inputs, { borderRadius: roundness }]}>
            <MyTextInput
              label="Email"
              value={registerCredentials.email}
              onChangeText={_setEmail}
              error={registerCredentials.error}
              left={<TextInput.Icon name={"email"} />}
            />
            <MyTextInput
              label="Password"
              value={registerCredentials.password}
              onChangeText={_setPassword}
              secureTextEntry={!registerCredentials.showPassword}
              left={<TextInput.Icon name={"lock"} />}
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
              left={<TextInput.Icon name={"lock"} />}
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

          <Button
            mode="contained"
            onPress={register}
            style={authStyles.signingButton}>
            Sign Up
          </Button>
        </View>
        {registerCredentials.errorMessage ? (
          <Paragraph style={[authStyles.errorMessage, { color: colors.error }]}>
            {registerCredentials.errorMessage}
          </Paragraph>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
