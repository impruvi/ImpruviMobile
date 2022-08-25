import React, {createContext, useContext, useMemo, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserType} from "../constants/userType";
import {DdSdkReactNative} from '@datadog/mobile-react-native';
import HttpClient from "../http-client/httpClient";

const AuthContext = createContext({});

export const AuthProvider = ({children, initialPlayerId, initialCoachId, initialUserType}) => {

    const [userType, setUserType] = useState(initialUserType); // if userType is present then user is authenticated
    const [playerId, setPlayerId] = useState(initialPlayerId);
    const [coachId, setCoachId] = useState(initialCoachId);

    const setDataDogUser = ({userType, coach, player}) => {
        if (__DEV__) {
            return;
        }

        if (userType === UserType.Coach) {
            if (!!coach) {
                DdSdkReactNative.setUser({
                    id: coach.coachId,
                    name: `${coach.firstName} ${coach.lastName}`,
                    email: coach.email,
                    type: UserType.Coach
                });
            } else {
                DdSdkReactNative.setUser({});
            }
        } else {
            if (!!player) {
                DdSdkReactNative.setUser({
                    id: player.playerId,
                    name: `${player.firstName} ${player.lastName}`,
                    email: player.email,
                    type: UserType.Player
                });
            } else {
                DdSdkReactNative.setUser({});
            }
        }
    }

    const onSetCoachId = async (coachId) => {
        setCoachId(coachId);
        setUserType(UserType.Coach);
        await AsyncStorage.setItem('coachId', coachId);
        await AsyncStorage.setItem('userType', UserType.Coach);

        const httpClient = new HttpClient();
        if (!!coachId) {
            const coach = await httpClient.getCoach(coachId);
            if (coach === null) {
                await signOut();
            } else {
                setDataDogUser({
                    userType: UserType.Coach,
                    coach: coach
                });
            }
        }
    }

    const onSetPlayerId = async (playerId) => {
        setPlayerId(playerId);
        setUserType(UserType.Player);
        await AsyncStorage.setItem('playerId', playerId);
        await AsyncStorage.setItem('userType', UserType.Player);

        const httpClient = new HttpClient();
        if (!!playerId) {
            const player = await httpClient.getPlayer(playerId);
            if (player === null) {
                await signOut();
            } else {
                setDataDogUser({
                    userType: UserType.Player,
                    player: player
                });
            }
        }
    }

    const signOut = async () => {
        try {
            if (userType === UserType.Coach) {
                await AsyncStorage.removeItem('userType');
                await AsyncStorage.removeItem('coachId');
                setUserType(undefined);
                setDataDogUser({
                    userType: UserType.Coach,
                })
            } else {
                await AsyncStorage.removeItem('userType');
                await AsyncStorage.removeItem('playerId');
                setUserType(undefined);
                setDataDogUser({
                    userType: UserType.Player,
                })
            }
        } catch(exception) {
            console.error('An unexpected error occurred', exception);
        }
    }

    const memoedValue = useMemo(() => ({
        userType,
        playerId,
        coachId,
        setPlayerId: onSetPlayerId,
        setCoachId: onSetCoachId,
        signOut: signOut
    }), [userType, playerId, coachId, signOut, onSetPlayerId, onSetCoachId]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
