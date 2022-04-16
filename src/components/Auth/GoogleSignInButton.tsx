import React from "react";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Button } from "react-native-paper";
import { googleFirebaseConfig } from "@/config";
import { AuthButtonProps } from "./AuthButtonProps";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignInButton: React.FC<AuthButtonProps> = ({
  loginCredentials,
  setLoginCredentials,
  setLoading,
}) => {
  const [request, response, promptAsync] =
    Google.useIdTokenAuthRequest(googleFirebaseConfig);

  React.useEffect(() => {
    if (response?.type === "success") {
      setLoading(true);
      try {
        const { id_token } = response.params;

        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token);
        const token = credential.accessToken;
        setLoading(false);
        signInWithCredential(auth, credential);
      } catch (err) {
        setLoginCredentials({
          ...loginCredentials,
          errorMessage: "Something went wrong with Google...",
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
      Sign In with Google
    </Button>
  );
};
const styles = StyleSheet.create({});

export default GoogleSignInButton;
