import { authStyles } from "@/styles/Auth/authStyles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Button } from "react-native-paper";
import { AuthButtonProps } from "./AuthButtonProps";

const LoginButton: React.FC<AuthButtonProps> = ({
  loginCredentials,
  setLoginCredentials,
  setLoading,
}) => {
  const login = () => {
    if (loginCredentials.email && loginCredentials.password) {
      setLoading(true);

      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        loginCredentials.email,
        loginCredentials.password
      )
        .then(() => {
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
  return (
    <Button mode="contained" onPress={login} style={authStyles.signingButton}>
      Sign In
    </Button>
  );
};

export default LoginButton;
