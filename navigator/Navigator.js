import React, {useEffect, useRef} from 'react';
import {Animated, SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import InvitationCodeScreen from "../screens/authentication/InvitationCodeScreen";

import {RootScreenNames} from '../screens/ScreenNames';
import PlayerNavigator from "./player/PlayerNavigator";
import CoachNavigator from "./coach/CoachNavigator";
import useError from "../hooks/useError";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {UserType} from "../constants/userType";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import SignInScreen from "../screens/authentication/SignInScreen";
import UpdateAppScreen from "../screens/UpdateAppScreen";
import useAuth from "../hooks/useAuth";
import {useCallback} from 'react';

const Stack = createStackNavigator();

const RootNavigator = ({isCompatible, newAppVersionPreviewImage}) => {

    const {userType} = useAuth();
    const {error, setError} = useError();
    const errorAnimation = useRef(new Animated.Value(-200)).current;

    useEffect(() => {
        if (!!error) {
            Animated.timing(errorAnimation, {toValue: 0, duration: 300, useNativeDriver: false}).start();
        } else {
            Animated.timing(errorAnimation, {toValue: -200, duration: 300, useNativeDriver: false}).start();
        }
    }, [error]);

    const closeError = useCallback(() => {
        setError(null);
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Navigator screenOptions={{headerShown: false, cardStyle: styles.cardStyle}}>
                {!isCompatible && (
                    <Stack.Screen name={RootScreenNames.UpdateApp}
                                  component={UpdateAppScreen}
                                  initialParams={{previewImageFileLocation: newAppVersionPreviewImage}}/>
                )}
                {isCompatible && (
                    <>
                        {!userType && (
                            <Stack.Group>
                                <Stack.Screen name={RootScreenNames.SignIn} component={SignInScreen}/>
                                <Stack.Screen name={RootScreenNames.InvitationCode} component={InvitationCodeScreen}/>
                                <Stack.Screen name={RootScreenNames.TermsAndConditions} component={TermsAndConditionsScreen}/>
                            </Stack.Group>
                        )}
                        {!!userType && (
                            <>
                                {userType === UserType.Player && (
                                    <Stack.Screen name={RootScreenNames.PlayerNavigator} component={PlayerNavigator}/>
                                )}
                                {userType === UserType.Coach && (
                                    <Stack.Screen name={RootScreenNames.CoachNavigator} component={CoachNavigator}/>
                                )}
                            </>
                        )}
                    </>
                )}
            </Stack.Navigator>

            <Animated.View style={{...styles.errorContainer, top: errorAnimation}}>
                <SafeAreaView style={styles.errorSafeAreaView}>
                    <View style={styles.errorBox}>
                        <View style={styles.content}>
                            <Text style={styles.errorText}>{error}</Text>

                            <TouchableOpacity style={styles.errorClose} onPress={closeError}>
                                <FontAwesomeIcon icon={faXmarkLarge} size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    cardStyle: {
        backgroundColor: 'white'
    },
    errorContainer: {
        position: 'absolute',
        left: 0,
        width: '100%'
    },
    errorSafeAreaView: {
        width: '100%'
    },
    errorBox: {
        padding: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .3,
        shadowRadius: 4
    },
    content: {
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, .9)',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errorText: {
        fontWeight: '600'
    },
    errorClose: {
        padding: 5
    }
});

export default RootNavigator;
