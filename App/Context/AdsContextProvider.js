import { createContext, useEffect, useState } from "react";
import {
  Appodeal,
  AppodealAdType,
  AppodealSdkEvent,
  AppodealInterstitialEvent,
  AppodealBannerEvent,
  AppodealRewardedEvent,
  AppodealLogLevel,
} from "react-native-appodeal";

const isDev = __DEV__;
let levelsPlayed = 0;

import { Alert, ToastAndroid } from "react-native";

const adTypes = AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO;

const toast = (message) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

const registerListeners = (setStateAd) => {
  // SDK callbacks
  Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () => {
    console.log("Appodeal SDK initialized");
  });
  Appodeal.addEventListener(AppodealSdkEvent.AD_REVENUE, (revenue) => {
    console.log("Appodeal SDK did receive ad revenue: ", revenue);
  });
  // Interstitial callbacks
  Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, (event) =>
    console.log("Interstitial loaded. Precache: ", event.isPrecache)
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => {
    setStateAd(AppodealInterstitialEvent.SHOWN)
    console.log("Interstitial shown");
    levelsPlayed += 1;
    Appodeal.setCustomStateValue(levelsPlayed, "levels_played");
    Appodeal.setCustomStateValue("gold", "player_rank");
  });
  Appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () =>
    console.log("Interstitial expired")
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
    console.log("Interstitial clicked")
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () => {
    setStateAd(AppodealInterstitialEvent.CLOSED)
    console.log("Interstitial closed")
  }
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, (e) => {
    setStateAd(AppodealInterstitialEvent.FAILED_TO_LOAD)
    console.log("Interstitial failed to load", e)
  }
  );
  Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () => {
    setStateAd(AppodealInterstitialEvent.FAILED_TO_SHOW)
    console.log("Interstitial failed to show")
  }
  );
  // Banner callbacks
  Appodeal.addEventListener(AppodealBannerEvent.LOADED, (event) =>
    console.log(
      "Banner loaded. Height: ",
      event.height + ", precache: " + event.isPrecache
    )
  );
  Appodeal.addEventListener(AppodealBannerEvent.SHOWN, () =>
    console.log("Banner shown")
  );
  Appodeal.addEventListener(AppodealBannerEvent.EXPIRED, () =>
    console.log("Banner expired")
  );
  Appodeal.addEventListener(AppodealBannerEvent.CLICKED, () =>
    console.log("Banner clicked")
  );
  Appodeal.addEventListener(AppodealBannerEvent.FAILED_TO_LOAD, (e) =>
    console.log("Banner failed to load", e)
  );

  // Rewarded video callbacks
  Appodeal.addEventListener(AppodealRewardedEvent.LOADED, (event) =>
    console.log("Rewarded video loaded. Precache: ", event.isPrecache)
  );
  Appodeal.addEventListener(AppodealRewardedEvent.SHOWN, () =>
    console.log("Rewarded video shown")
  );
  Appodeal.addEventListener(AppodealRewardedEvent.EXPIRED, () =>
    console.log("Rewarded video expired")
  );
  Appodeal.addEventListener(AppodealRewardedEvent.REWARD, (event) => {
    console.log(
      "Rewarded video finished. Amount: ",
      event.amount + ", currency: " + event.currency
    )
  }
  );
  Appodeal.addEventListener(AppodealRewardedEvent.CLOSED, (event) => {
    console.log("Rewarded video closed, is finished: ", event.isFinished)
  }
  );
  Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_LOAD, (e) =>
    console.log("Rewarded video failed to load", e)
  );
  Appodeal.addEventListener(AppodealRewardedEvent.FAILED_TO_SHOW, () =>
    console.log("Rewarded video failed to show")
  );
};

const initializeAds = (setStateAd) => {
  registerListeners(setStateAd);
  Appodeal.setTabletBanners(false);

  Appodeal.setLogLevel(AppodealLogLevel.DEBUG);

  Appodeal.setChildDirectedTreatment(false);

  Appodeal.initialize(
    "75e69c2d9b627dada9ad61fa882dbbf745bd2f2f88a65e17",
    adTypes
  );
};

export const AdsContext = createContext();

function AdsContextProvider({ children }) {
  const [stateAd, setStateAd] = useState('')
  
  const showRewardedAd = () => {
    try {
      Appodeal.show(adTypes, "default");
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  useEffect(() => {
    initializeAds(setStateAd);
  }, []);
  return (
    <AdsContext.Provider value={{ showRewardedAd, stateAd }}>
      {children}
    </AdsContext.Provider>
  );
}

export default AdsContextProvider;
