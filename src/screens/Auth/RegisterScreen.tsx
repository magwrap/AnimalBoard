import MyActivityIndicator from "@/components/MyCustoms/MyActivityIndicator";
import MyTextInput from "@/components/MyCustoms/MyTextInput";
import { AuthScreenNames } from "@/navigation/ScreenNames";
import { MyColors } from "@/styles/ColorPallete";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
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
import { doc, setDoc, Timestamp, getFirestore } from "firebase/firestore";
import { FirestoreCollectionNames } from "@/hooks/useFirebase";
import DatePicker from "@/components/Auth/DatePicker";
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
  const nowDate = new Date();
  const thirteenYearsFromNow = nowDate.setFullYear(nowDate.getFullYear() - 13);
  const thirteenYearsFromNowPlsDay = thirteenYearsFromNow + 86400000;

  const [date, setDate] = useState<Date | undefined>(
    new Date(thirteenYearsFromNowPlsDay)
  );
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

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
      date?.toLocaleDateString() !==
        new Date(thirteenYearsFromNowPlsDay).toLocaleDateString()
    ) {
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
          .then(async (userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, FirestoreCollectionNames.USERS, user.uid), {
              email: user.email,
              displayName: user.displayName,
              description: "",
              avatar: user.photoURL,
              emailVerified: user.emailVerified,
              birthDate: date
                ? Timestamp.fromDate(date)
                : Timestamp.fromDate(new Date()),
            });
            await sendEmailVerification(user);
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
  const warningColor = registerCredentials.error
    ? {
        color: MyColors.WARNING,
      }
    : {};

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
        <Headline style={[authStyles.title, titleColor]}>Animal Board</Headline>
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
          <DatePicker
            date={date}
            setDate={setDate}
            error={registerCredentials.error}
            thirteenYearsFromNow={thirteenYearsFromNow}
          />
          <View style={styles.dateField}>
            <View style={styles.date}>
              <Paragraph style={warningColor}>Date of birth: </Paragraph>
              <Paragraph>{date ? date?.toLocaleDateString() : "..."}</Paragraph>
            </View>
            <Caption>You must be over 13 years old in order to sign up</Caption>
          </View>

          <Button
            mode="contained"
            onPress={register}
            style={authStyles.signingButton}>
            Sign Up
          </Button>
        </View>
        {registerCredentials.errorMessage ? (
          <Text style={authStyles.errorMessage}>
            {registerCredentials.errorMessage}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  dateField: {
    margin: 5,
  },
  date: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});

export default RegisterScreen;
