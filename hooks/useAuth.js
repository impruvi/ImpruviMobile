import React, {createContext, useContext, useMemo, useState} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [userId, setUserId] = useState();

    const memoedValue = useMemo(() => ({
        userId,
        setUserId,
    }), [userId, setUserId]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
