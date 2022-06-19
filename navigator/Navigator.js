import React, {useEffect, useRef} from 'react';
import {Animated, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthenticationScreen from "../screens/AuthenticationScreen";

import {RootScreenNames} from '../screens/ScreenNames';
import useAuth from "../hooks/useAuth";
import PlayerNavigator from "./PlayerNavigator";
import CoachNavigator from "./CoachNavigator";
import useError from "../hooks/useError";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmarkLarge} from "@fortawesome/pro-light-svg-icons";
import {UserType} from "../constants/userType";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";


const Stack = createStackNavigator();

const RootNavigator = () => {
    const {userType} = useAuth();
    const {error, setError} = useError();
    const errorAnimation = useRef(new Animated.Value(-200)).current

    useEffect(() => {
        if (!!error) {
            Animated.timing(errorAnimation, {toValue: 0, duration: 300, useNativeDriver: false}).start();
        } else {
            Animated.timing(errorAnimation, {toValue: -200, duration: 300, useNativeDriver: false}).start();
        }
    }, [error]);

    return (
        <View style={{flex: 1, position: 'relative'}}>
            <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
                {!userType && (
                    <>
                        <Stack.Screen name={RootScreenNames.Authentication} component={AuthenticationScreen}/>
                        <Stack.Screen name={RootScreenNames.TermsAndConditions} component={TermsAndConditionsScreen}/>
                    </>
                )}
                {!!userType && userType === UserType.Player && (
                    <Stack.Screen name={RootScreenNames.PlayerNavigator} component={PlayerNavigator}/>
                )}
                {!!userType && userType === UserType.Coach && (
                    <Stack.Screen name={RootScreenNames.CoachNavigator} component={CoachNavigator}/>
                )}
            </Stack.Navigator>

            <Animated.View style={{position: 'absolute', top: errorAnimation, left: 0, width: '100%'}}>
                <SafeAreaView style={{width: '100%'}}>
                    <View style={{padding: 8, shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .3, shadowRadius: 4}}>
                        <View style={{width: '100%', padding: 20, backgroundColor: 'rgba(255, 255, 255, .9)', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontWeight: '600'}}>{error}</Text>

                            <TouchableOpacity style={{padding: 5}} onPress={() => setError(null)}>
                                <FontAwesomeIcon icon={faXmarkLarge} size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

export default RootNavigator;
