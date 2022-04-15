import { getAuth } from "firebase/auth";
import React from "react";
import AppStackNavigator from "./App/AppStackNavigator";
import AuthStackNavigator from "./Auth/AuthNavigator";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = ({}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log("app");
    return <AppStackNavigator />;
  } else {
    console.log("auth");
    return <AuthStackNavigator />;
  }
};

export default Routes;
