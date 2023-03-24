/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";

import { AuthenticationContextProvider } from "./App/Context/AuthenticationContextProvider";
import { setI18nConfig } from "./App/I18n";
import AppNavigation from "./App/Navigation/AppNavigation";
import {
  Appodeal,
  AppodealAdType,
  AppodealSdkEvent,
} from "react-native-appodeal";

const adTypes =
  AppodealAdType.INTERSTITIAL |
  AppodealAdType.REWARDED_VIDEO |
  AppodealAdType.BANNER;

Appodeal.initialize(
  "75e69c2d9b627dada9ad61fa882dbbf745bd2f2f88a65e17",
  adTypes
);

Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () =>
  console.log("Appodeal SDK did initialize")
);

function App(): JSX.Element {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setI18nConfig()
      .then((res) => res && setLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) return <></>;

  return (
    <AuthenticationContextProvider>
      <AppNavigation />
    </AuthenticationContextProvider>
  );
}

export default App;
