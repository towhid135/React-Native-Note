import React, {useEffect, useRef, useState} from 'react';
import {View,StyleSheet,Text,TextInput,Button} from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


const PushNotification = (props) => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
  
      useEffect(() => {
        registerForPushNotificationsAsync().then(token =>

            setExpoPushToken(token)
        );

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);


        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          //  console.log(response);
            const {notification: {request: {content: {data: {screen}}}}} = response
//when the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
            if (screen) {
                props.navigation.navigate(screen)
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
  
     return (
       <View>
          <Button title='Send Notification' onPress={() =>{}} />
       </View>
       )
}


async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log("existingStatus",existingStatus)
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            console.log("finalStatus",finalStatus)
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FE9018',
        });
    }

    return token;
}

export default PushNotification;