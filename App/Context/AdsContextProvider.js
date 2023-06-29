import { createContext, useEffect, useState } from "react";
import { InitializationEvents, InterstitialEvents, IronSource } from 'ironsource-mediation';

export const AdStatutes = {
  LOADED: 'LOADED',
  ERROR: 'ERROR',
  OPENED: 'OPENED',
  CLOSED: 'CLOSED',
  OFF: 'OFF'
} 

const ironSourceApiKey = '1a9e88185';

const initializeAds = async (setStateAd, setInitialized) => {
  
  InitializationEvents.onInitializationComplete.setListener(() =>{
    setInitialized(true)
    console.log('onInitializationComplete')
  });

  /**
   * Invoked when an Interstitial ad became ready to be shown as a result of the precedent load function call.
   */
  InterstitialEvents.onInterstitialAdReady.setListener(() => {
    console.log('onInterstitialAdReady')
    setStateAd(AdStatutes.LOADED)
  });

  /**
   * Invoked when there is no Interstitial ad available as a result of the precedent loadInterstitial call.
   * You can learn about the reason by examining the error.
   */
  InterstitialEvents.onInterstitialAdLoadFailed.setListener((error) => {
    console.log('onInterstitialAdLoadFailed')
    console.log(error)
    setStateAd(AdStatutes.ERROR)
  });

  /**
   * Invoked when an Interstitial ad has opened.
   */
  InterstitialEvents.onInterstitialAdOpened.setListener(() => {
    console.log('onInterstitialAdOpened')
    setStateAd(AdStatutes.OPENED)
  });
  /**
   * Invoked when the ad is closed and the user is about to return to the application.
   */
  InterstitialEvents.onInterstitialAdClosed.setListener(() => {
    console.log('onInterstitialAdClosed')
    setStateAd(AdStatutes.CLOSED)
  }); 

  /**
   * Invoked when an Interstitial ad failed to show.
   * You can learn about the reason by examining the error.
   */
  InterstitialEvents.onInterstitialAdShowFailed.setListener((error) => {
    console.log('onInterstitialAdShowFailed')
    console.log(error)
    setStateAd(AdStatutes.ERROR)
  });

  IronSource.init(ironSourceApiKey);
};


export const AdsContext = createContext();

function AdsContextProvider({ children }) {
  const [stateAd, setStateAd] = useState(AdStatutes.OFF)
  const [initialized, setInitialized] = useState(false)

  const showAd = () => {
    if (initialized) {
      IronSource.loadInterstitial();
    }else{
      setStateAd(AdStatutes.ERROR)
    }
  };

  useEffect(() => {
    if (stateAd === AdStatutes.LOADED) {
      IronSource.showInterstitial();
    }
  }, [stateAd])
  
  const resetFlow = () => setStateAd(AdStatutes.OFF)

  useEffect(() => {
    initializeAds(setStateAd, setInitialized);
    return () => InterstitialEvents.removeAllListeners()
  }, []);
  return (
    <AdsContext.Provider value={{ stateAd, showAd, resetFlow }}>
      {children}
    </AdsContext.Provider>
  );
}

export default AdsContextProvider;
