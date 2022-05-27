import { addUserToDB } from "@/hooks/firebase/User/FirestoreUser";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import LoadingScreen from "@/screens/LoadingScreen";
import { fetchUserThunk } from "@/state";
import { fetchMyFeedThunk } from "@/state/slices/MyFeed";
import { fetchMyFollowingThunk } from "@/state/slices/MyFollowing";
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
  const followingState = useAppSelector(
    (state) => state.MyFollowingReducer.myFollowing
  );

  const auth = getAuth();
  useEffect(() => {
    if (currentUser && loggedIn) {
      addUserToDB(currentUser);
      dispatch(fetchUserThunk(currentUser.uid));
      dispatch(fetchMyFollowingThunk(currentUser.uid));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (currentUser && loggedIn && followingState) {
      dispatch(fetchMyFeedThunk(currentUser.uid));
    }
  }, [followingState]);

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
