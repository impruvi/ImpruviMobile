import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserType} from "../constants/userType";

const AuthContext = createContext({});

export const AuthProvider = ({children, initialPlayerId, initialCoachId, initialUserType}) => {

    const [userType, setUserType] = useState(initialUserType); // if userType is present then user is authenticated
    const [playerId, setPlayerId] = useState(initialPlayerId);
    const [coachId, setCoachId] = useState(initialCoachId);

    const onSetPlayerId = async (playerId) => {
        setPlayerId(playerId);
        await AsyncStorage.setItem('playerId', playerId);
        setUserType(UserType.Player);
        await AsyncStorage.setItem('userType', UserType.Player);
    }

    const onSetCoachId = async (coachId) => {
        setCoachId(coachId);
        await AsyncStorage.setItem('coachId', coachId);
        setUserType(UserType.Coach);
        await AsyncStorage.setItem('userType', UserType.Coach);
    }

    const signOut = async () => {
        try {
            if (userType === UserType.Coach) {
                await AsyncStorage.removeItem('userType');
                await AsyncStorage.removeItem('coachId');
                setUserType(undefined);
            } else {
                await AsyncStorage.removeItem('userType');
                await AsyncStorage.removeItem('playerId');
                setUserType(undefined);
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
