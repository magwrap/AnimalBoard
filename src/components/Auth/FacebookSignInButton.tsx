import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AuthButtonProps } from "./AuthButtonProps";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { facebookConfigAuth, facebookFirebaseConfig } from "@/config";

WebBrowser.maybeCompleteAuthSession();

const FacebookSignInButton: React.FC<AuthButtonProps> = ({
  loginCredentials,
  setLoginCredentials,
  setLoading,
}) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    ...facebookConfigAuth,
    // ...facebookFirebaseConfig,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      try {
        const auth = getAuth();
        const credential = FacebookAuthProvider.credential(access_token);
        // const token = credential.accessToken;
        signInWithCredential(auth, credential);
        setLoading(false);
      } catch (err) {
        setLoginCredentials({
          ...loginCredentials,
          errorMessage: "Something went wrong with Facebook...",
        });
        setLoading(false);
      }
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}>
      Sign In with facebook
    </Button>
  );
};
const styles = StyleSheet.create({});

export default FacebookSignInButton;
