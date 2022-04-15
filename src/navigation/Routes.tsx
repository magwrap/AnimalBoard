import LoadingScreen from "@/screens/LoadingScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import AppStackNavigator from "./App/AppStackNavigator";
import AuthStackNavigator from "./Auth/AuthNavigator";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = ({}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log("Routes: ", user?.email);
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  if (loggedIn) {
    console.log("app");
    return <AppStackNavigator />;
  } else {
    console.log("auth");
    return <AuthStackNavigator />;
  }
  return <LoadingScreen />;
};

export default Routes;
