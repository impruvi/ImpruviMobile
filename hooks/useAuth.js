import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserType} from "../constants/userType";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [userType, setUserType] = useState(); // if userType is present then user is authenticated
    const [player, setPlayer] = useState();
    const [coach, setCoach] = useState();

    const getFromStorage = async () => {
        const userType = await AsyncStorage.getItem('userType');
        if (!userType) {
            return;
        }

        setUserType(userType);
        if (userType === UserType.Coach) {
            const coachJSON = await AsyncStorage.getItem('coach');
            setCoach(JSON.parse(coachJSON));
        } else {
            const playerJSON = await AsyncStorage.getItem('player');
            setPlayer(JSON.parse(playerJSON));
        }
    }

    useEffect(() => {
        getFromStorage().then(() => setIsLoadingAuth(false));
    }, []);

    const onSetPlayer = async (player) => {
        setPlayer(player);
        await AsyncStorage.setItem('player', JSON.stringify(player));
        setUserType(UserType.Player);
        await AsyncStorage.setItem('userType', UserType.Player);
    }

    const onSetCoach = async (coach) => {
        setCoach(coach)
        await AsyncStorage.setItem('coach', JSON.stringify(coach));
        setUserType(UserType.Coach);
        await AsyncStorage.setItem('userType', UserType.Coach);
    }

    const signOut = async () => {
        try {
            if (userType === UserType.Coach) {
                await AsyncStorage.removeItem('userType');
                await AsyncStorage.removeItem('coach');
                setUserType(undefined);
            } else {
                await AsyncStorage.removeItem('userType');
                await AsyncStorage.removeItem('player');
                setUserType(undefined);
            }
        } catch(exception) {
            console.error('An unexpected error occurred', exception);
        }
    }

    const memoedValue = useMemo(() => ({
        isLoadingAuth,
        userType,
        player,
        coach,
        setPlayer: onSetPlayer,
        setCoach: onSetCoach,
        signOut: signOut
    }), [isLoadingAuth, userType, player, coach, signOut, onSetPlayer, onSetCoach]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
