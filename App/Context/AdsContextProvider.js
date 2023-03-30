import { createContext, useEffect } from "react";
import {
  Appodeal,
  AppodealAdType,
  AppodealSdkEvent,
} from "react-native-appodeal";
import { Alert } from "react-native/Libraries/Alert/Alert";

const adTypes =
  AppodealAdType.BANNER |
  AppodealAdType.INTERSTITIAL |
  AppodealAdType.REWARDED_VIDEO;


Appodeal.initialize(
  "75e69c2d9b627dada9ad61fa882dbbf745bd2f2f88a65e17",
  adTypes
);

Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () =>
  console.log("Appodeal SDK did initialize")
);


export const AdsContext = createContext();

function AdsContextProvider({ children }) {
  const showRewardedAd = () => {
    try {
      Appodeal.show(adTypes, 'default');
    } catch (error) {
      Alert.alert("Error", error);
    }
  };
  return (
    <AdsContext.Provider value={{ showRewardedAd }}>
      {children}
    </AdsContext.Provider>
  );
}

export default AdsContextProvider;
