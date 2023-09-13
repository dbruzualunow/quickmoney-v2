/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification , {Importance} from 'react-native-push-notification';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

AppRegistry.registerComponent(appName, () => App);
