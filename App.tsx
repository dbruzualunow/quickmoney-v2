/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";

import { AuthenticationContextProvider } from "./App/Context/AuthenticationContextProvider";
import AdsContextProvider from "./App/Context/AdsContextProvider";
import { setI18nConfig } from "./App/I18n";
import AppNavigation from "./App/Navigation/AppNavigation";

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
      <AdsContextProvider>
        <AppNavigation />
      </AdsContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App;
