import { createContext, useEffect } from "react";
import {
  Appodeal,
  AppodealInterstitialEvent,
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
Appodeal.cache(AppodealAdType.REWARDED_VIDEO);
export const AdsContext = createContext();

function AdsContextProvider({ children }) {
  const showRewardedAd = () => {
    console.log("spotted");
    Appodeal.show(AppodealAdType.REWARDED_VIDEO);
  };
  return (
    <AdsContext.Provider value={{ showRewardedAd }}>
      {children}
    </AdsContext.Provider>
  );
}

export default AdsContextProvider;
