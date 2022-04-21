import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import Routes from "@/navigation/Routes";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import { NavigationContainer } from "@react-navigation/native";
import { CombinedDarkTheme, CombinedDefaultTheme } from "@/styles/CobinedThems";
import { getTheme, store } from "@/state";
import {
  toggleTheme,
  useAppDispatch,
  useAppSelector,
} from "@/hooks/reduxHooks";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "@/config";
import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/en"; // or any other locale you need

LogBox.ignoreAllLogs();

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

registerTranslation("en", en);

export default function App() {
  const Themes = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
      (async () => {
        const wasThemeDark = await getTheme();
        if (wasThemeDark !== isThemeDark) {
          dispatch(toggleTheme());
        }
      })();
    }, []);

    const dispatch = useAppDispatch();
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
