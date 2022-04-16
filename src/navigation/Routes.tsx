import { fetchUser, useAppDispatch } from "@/hooks/reduxHooks";
import { addUserToDB } from "@/hooks/useFirebase";
import LoadingScreen from "@/screens/LoadingScreen";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import AppStackNavigator from "./App/AppStackNavigator";
import AuthStackNavigator from "./Auth/AuthNavigator";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = ({}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  const auth = getAuth();
  useEffect(() => {
    if (currentUser && loggedIn) {
      addUserToDB(currentUser);
      dispatch(fetchUser(currentUser.uid));
    }
  }, [loggedIn]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
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
