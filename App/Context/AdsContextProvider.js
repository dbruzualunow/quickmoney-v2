import { createContext, useEffect, useState } from "react";
import MobileAds, { InterstitialAd, TestIds }  from 'react-native-google-mobile-ads';
import { AdEventType } from "react-native-google-mobile-ads/src";

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

const initializeAds = async (setStateAd, setInitialized) => {
  const adapterStatuses = await MobileAds().initialize()
  if (adapterStatuses?.[0] && adapterStatuses?.[0].state === 1){
    setInitialized(true)
    interstitial.addAdEventListener(AdEventType.ERROR, () => {
      console.log("🚀 ~ file: AdsContextProvider.js:14 ~ interstitial.addAdEventListener ~ ERROR:", AdEventType.ERROR)
      setStateAd(AdEventType.ERROR)
    })
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log("🚀 ~ file: AdsContextProvider.js:17 ~ interstitial.addAdEventListener ~ LOADED:", AdEventType.LOADED)
      setStateAd(AdEventType.LOADED)
    })
    interstitial.addAdEventListener(AdEventType.OPENED, () => {
      console.log("🚀 ~ file: AdsContextProvider.js:18 ~ interstitial.addAdEventListener ~ AdEventType.OPENED:", AdEventType.OPENED)
      setStateAd(AdEventType.OPENED)
    })
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log("🚀 ~ file: AdsContextProvider.js:24 ~ interstitial.addAdEventListener ~ AdEventType.CLOSED:", AdEventType.CLOSED)
      setStateAd(AdEventType.CLOSED)
    })
  }
};

export const AdsContext = createContext();

function AdsContextProvider({ children }) {
  const [stateAd, setStateAd] = useState('off')
  const [initialized, setInitialized] = useState(false)

  const showAd = () => {
    if (initialized) {
      interstitial.load()
    }else{
      setStateAd(AdEventType.ERROR)
    }
  };

  useEffect(() => {
    if (stateAd === AdEventType.LOADED) {
      interstitial.show()
    }
  }, [stateAd])
  
  const resetFlow = () => setStateAd('off')

  useEffect(() => {
    initializeAds(setStateAd, setInitialized);
    return () => interstitial.removeAllListeners()
  }, []);
  return (
    <AdsContext.Provider value={{ stateAd, showAd, resetFlow }}>
      {children}
    </AdsContext.Provider>
  );
}

export default AdsContextProvider;
