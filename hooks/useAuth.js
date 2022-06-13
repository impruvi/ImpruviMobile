import React, {createContext, useContext, useMemo, useState} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [userType, setUserType] = useState(); // if userType is present then user is authenticated
    const [player, setPlayer] = useState();
    const [coach, setCoach] = useState();

    const memoedValue = useMemo(() => ({
        userType,
        player,
        coach,
        setUserType,
        setPlayer,
        setCoach
    }), [userType, player, coach, setUserType, setPlayer, setCoach]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
