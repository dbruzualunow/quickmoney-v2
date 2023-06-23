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
      channelId: "channelId", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
PushNotification.configure({

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('REMOTE NOTIFICATION ==>', notification)
    if (notification.foreground) {
      PushNotification.localNotification({
        title: notification.title,
        message: notification.message,
        channelId: 'channelId',
        // largeIcon: "ic_notification",
        // smallIcon: "ic_notification",
        // bigLargeIcon: "ic_notification"
      })
    }
    // process the notification here
  },
  onRegister: function(token) {
    console.log('TOKEN:', token)
    AsyncStorage.setItem('fcmToken', token?.token || '')
  },
  // Android only: GCM or FCM Sender ID
  // senderID: "393809536636",
  popInitialNotification: true,
  requestPermissions: true,
  // largeIcon: "ic_launcher_foreground",
  // smallIcon: "ic_launcher_foreground",
  // bigLargeIcon: "ic_launcher_foreground",
})

AppRegistry.registerComponent(appName, () => App);
