import {AuthProvider} from "./hooks/useAuth";
import {HttpClientProvider} from "./hooks/useHttpClient";
import Navigator from "./navigator/Navigator";
import {NavigationContainer} from "@react-navigation/native";
import {ErrorProvider} from "./hooks/useError";
import {OnboardingProvider} from "./hooks/useOnboarding";
import {BottomSheetModalProvider,} from '@gorhom/bottom-sheet';
import {PushProvider} from "./hooks/usePush";
import * as Notifications from 'expo-notifications';
import React, { useRef, useEffect, } from 'react';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});



export default function App() {
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


  return (
      <NavigationContainer>
          <BottomSheetModalProvider>
              <AuthProvider>
                  <ErrorProvider>
                      <OnboardingProvider>
                          <HttpClientProvider>
                              <PushProvider>
                                <Navigator />
                              </PushProvider>
                          </HttpClientProvider>
                      </OnboardingProvider>
                  </ErrorProvider>
              </AuthProvider>
          </BottomSheetModalProvider>
      </NavigationContainer>
  );
}
