import { addUserToDB } from "@/hooks/useFirebase";
import LoadingScreen from "@/screens/LoadingScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import AppStackNavigator from "./App/AppStackNavigator";
import AuthStackNavigator from "./Auth/AuthNavigator";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = ({}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      addUserToDB(user);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  });
  if (loading) {
    return <LoadingScreen />;
  }
  if (loggedIn) {
    return <AppStackNavigator />;
  } else {
    return <AuthStackNavigator />;
  }
};

export default Routes;
