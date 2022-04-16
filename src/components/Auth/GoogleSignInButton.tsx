import React from "react";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button } from "react-native-paper";
import { googleConfig } from "@/config";

WebBrowser.maybeCompleteAuthSession();

interface GoogleSignButtonInProps {}

const GoogleSignInButton: React.FC<GoogleSignButtonInProps> = ({}) => {
  const [request, response, promptAsync] = Google.useAuthRequest(googleConfig);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}>
      Login
    </Button>
  );
};
const styles = StyleSheet.create({});

export default GoogleSignInButton;
