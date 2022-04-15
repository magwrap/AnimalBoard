import { StatusBar } from "expo-status-bar";
import React from "react";
import Routes from "@/navigation/Routes";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "@/state";

import { useAppSelector } from "@/hooks/reduxHooks";
import { initializeApp } from "firebase/app";
import { CombinedDarkTheme, CombinedDefaultTheme } from "@/styles/CobinedThems";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const firebaseConfig = {
  apiKey: "AIzaSyDOug8Vt3hPSfKkLHekJ84OYw2L4Zl9L1s",
  authDomain: "animalboard-861e5.firebaseapp.com",
  projectId: "animalboard-861e5",
  storageBucket: "animalboard-861e5.appspot.com",
  messagingSenderId: "22475114245",
  appId: "1:22475114245:web:1e06d65ccad2164249596c",
  measurementId: "G-LJBZENPNEP",
};

export const app = initializeApp(firebaseConfig);

export default function App() {
  const Themes = ({ children }: { children: React.ReactNode }) => {
    const isThemeDark = useAppSelector(
      (state) => state.DarkThemeReducer.isDarkTheme
    );
    let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    );
  };

  return (
    <Provider store={store}>
      <Themes>
        <Routes />
        <StatusBar />
      </Themes>
    </Provider>
  );
}
