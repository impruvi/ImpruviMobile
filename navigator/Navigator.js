import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useWindowDimensions} from "react-native";
import AuthenticationScreen from "../screens/AuthenticationScreen";

import {ScreenNames} from '../screens/ScreenNames';
import useAuth from "../hooks/useAuth";
import PlayerNavigator from "./PlayerNavigator";
import CoachNavigator from "./CoachNavigator";


const Stack = createStackNavigator();

const RootNavigator = () => {
    const {userId, userType} = useAuth();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {!userId && (
                <Stack.Screen name={ScreenNames.Authentication} component={AuthenticationScreen}/>
            )}
            {!!userId && userType === 'Player' && (
                <Stack.Screen name={ScreenNames.PlayerNavigator} component={PlayerNavigator}/>
            )}
            {!!userId && userType === 'Coach' && (
                <Stack.Screen name={ScreenNames.CoachNavigator} component={CoachNavigator}/>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
