/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from "@react-native-async-storage/async-storage";

// const date = new Date();
// console.log("🚀 ~ file: index.js:11 ~ date:", date)

// PushNotification.createChannel(
//     {
//       channelId: "channel-id", // (required)
//       channelName: "My channel", // (required)
//       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//       playSound: true, // (optional) default: true
//       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
//   );
PushNotification.configure({

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('REMOTE NOTIFICATION ==>', notification)

    // process the notification here
  },
  onRegister: function(token) {
    console.log('TOKEN:', token)
    AsyncStorage.setItem('fcmToken', token?.token || '')
  },
  // Android only: GCM or FCM Sender ID
  // senderID: "393809536636",
  popInitialNotification: true,
  requestPermissions: true
})

  // PushNotification.localNotificationSchedule({
  //   channelId: 'channel-id',
  //   //... You can use all the options from localNotifications
  //   message: "My Notification Message", // (required)
  //   date: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 16, 0, 0)), // in 60 secs
  //   repeatType: 'minute',
  //   allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
  //   /* Android Only Properties */
  // });

AppRegistry.registerComponent(appName, () => App);
