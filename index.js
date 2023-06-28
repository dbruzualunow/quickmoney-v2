/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification , {Importance} from 'react-native-push-notification';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InitializationEvents, InterstitialEvents, IronSource } from 'ironsource-mediation';

PushNotification.createChannel(
    {
      channelId: "channelId",
      channelName: "My channel",
      channelDescription: "A channel to categorise your notifications",
      playSound: true,
      importance: Importance.HIGH,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);
PushNotification.configure({
  onNotification: function(notification) {
    console.log('REMOTE NOTIFICATION ==>', notification)
    if (notification.foreground) {
      PushNotification.localNotification({
        title: notification.title,
        message: notification.message,
        channelId: 'channelId',
      })
    }
  },
  onRegister: function(token) {
    console.log('TOKEN:', token)
    AsyncStorage.setItem('fcmToken', token?.token || '')
  },
  popInitialNotification: true,
  requestPermissions: true,
})

InitializationEvents.onInitializationComplete.setListener(() =>{
  console.log('onInitializationComplete')
});
// InterstitialEvents.onInterstitialAdReady.setListener();
InterstitialEvents.onInterstitialAdShowSucceeded.setListener(() => console.log("onInterstitialAdShowSucceeded"));

IronSource.init('1a9e88185');

IronSource.validateIntegration();
IronSource.loadInterstitial();

AppRegistry.registerComponent(appName, () => App);