import {AuthProvider} from "./hooks/useAuth";
import {InboxViewDateProvider} from "./hooks/useInboxViewDate";
import {HttpClientProvider} from "./hooks/useHttpClient";
import Navigator from "./navigator/Navigator";
import {DefaultTheme, NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {ErrorProvider} from "./hooks/useError";
import {OnboardingProvider} from "./hooks/useOnboarding";
import {BottomSheetModalProvider,} from '@gorhom/bottom-sheet';
import {PushProvider} from "./hooks/usePush";
import * as Notifications from 'expo-notifications';
import React, {useEffect, useRef, useState,} from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LongRequestProvider} from "./hooks/useLongRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserType} from "./constants/userType";
import Constants from "expo-constants";
import HttpClient from "./http-client/httpClient";
import * as SplashScreen from 'expo-splash-screen';
import './mockDataDog';
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';
import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import * as Analytics from 'expo-firebase-analytics';
import {GoogleAnalyticsClientProvider} from "./hooks/useGoogleAnalyticsClient";


if (!__DEV__) {
    const config = new DdSdkReactNativeConfiguration(
        "puba5b1f98e8ec9e9f100f647841e5f0be1",
        "prod",
        "b85ef3ba-2809-44f0-8a79-e70667b35e44",
        true, // track User interactions (e.g.: Tap on buttons. You can use 'accessibilityLabel' element property to give tap action the name, otherwise element type will be reported)
        true, // track XHR Resources
        true // track Errors
    );
    config.site = "US";
    config.nativeCrashReportEnabled = true;
    config.sessionSamplingRate = 100;

    DdSdkReactNative.initialize(config);
}

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {

    const [isReady, setIsReady] = useState(false);
    const [coachId, setCoachId] = useState();
    const [playerId, setPlayerId] = useState();
    const [userType, setUserType] = useState();
    const [isCompatible, setIsCompatible] = useState(true);
    const [newAppVersionPreviewImage, setNewAppVersionPreviewImage] = useState('');

    const notificationListener = useRef();
    const responseListener = useRef();
    const navigationRef = useNavigationContainerRef();
    const routeNameRef = useRef();

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

    const initializeAppCompatibility = async () => {
        const httpClient = new HttpClient();
        const version = Constants.manifest.version;
        const response = await httpClient.isAppVersionCompatible(version);
        setIsCompatible(response.isCompatible);
        setNewAppVersionPreviewImage(response.newVersionPreviewImageFileLocation);
    }

    const initializeAuth = async () => {
        const httpClient = new HttpClient();
        const userType = await AsyncStorage.getItem('userType');
        if (!userType) {
            return;
        }

        if (userType === UserType.Coach) {
            const coachId = await AsyncStorage.getItem('coachId');
            if (!!coachId) {
                const coach = await httpClient.getCoach(coachId);
                if (coach !== null) {
                    setUserType(userType);
                    setCoachId(coachId);
                }
            }
        } else {
            const playerId = await AsyncStorage.getItem('playerId');
            if (!!playerId) {
                const player = await httpClient.getPlayer(playerId);
                if (player !== null) {
                    setUserType(userType);
                    setPlayerId(playerId);
                }
            }
        }
    }

    const initialize = async () => {
        try {
            await SplashScreen.preventAutoHideAsync();
            await Promise.all([
                initializeAuth(),
                initializeAppCompatibility()
            ]);
            await SplashScreen.hideAsync();
        } catch (e) {
            console.warn(e);
        } finally {
            setIsReady(true)
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
              colors: {
                  ...DefaultTheme.colors,
                  background: 'white'
              },
            }}
            ref={navigationRef}
            onReady={() => {
                DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
                routeNameRef.current = navigationRef.getCurrentRoute()?.name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.getCurrentRoute()?.name;
                if (previousRouteName !== currentRouteName) {
                    await Analytics.logEvent('screen_view', { currentRouteName });
                }
                routeNameRef.current = currentRouteName;
            }}>
            <SafeAreaProvider>
                <BottomSheetModalProvider>
                    <InboxViewDateProvider>
                        <AuthProvider initialPlayerId={playerId} initialCoachId={coachId} initialUserType={userType}>
                            <ErrorProvider>
                                <OnboardingProvider>
                                    <HttpClientProvider>
                                        <GoogleAnalyticsClientProvider>
                                            <LongRequestProvider>
                                                <PushProvider>
                                                    <Navigator isCompatible={isCompatible} newAppVersionPreviewImage={newAppVersionPreviewImage}/>
                                                </PushProvider>
                                            </LongRequestProvider>
                                        </GoogleAnalyticsClientProvider>
                                    </HttpClientProvider>
                                </OnboardingProvider>
                            </ErrorProvider>
                        </AuthProvider>
                    </InboxViewDateProvider>
                </BottomSheetModalProvider>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};
