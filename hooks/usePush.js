import {createContext, useContext, useMemo, useState} from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";

const PushContext = createContext({});

export const PushProvider = ({children}) => {

    const [expoPushToken, setExpoPushToken] = useState('');

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    const memoedValue = useMemo(() => ({
        expoPushToken
    }), [expoPushToken]);

    return (
        <PushContext.Provider value={memoedValue}>
            {children}
        </PushContext.Provider>
    )
};

export default function usePush() {
    return useContext(PushContext);
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}