import React, {createContext, useContext, useMemo, useState} from 'react';

const ErrorContext = createContext({});

export const ErrorProvider = ({children}) => {

    const [error, setError] = useState();

    const onSetError = (err) => {
        setError(err);
        setTimeout(() => {
            setError(null);
        }, 3000);
    }

    const memoedValue = useMemo(() => ({
        error,
        setError: onSetError,
    }), [error, setError]);

    return (
        <ErrorContext.Provider value={memoedValue}>
            {children}
        </ErrorContext.Provider>
    )
}

export default function useError() {
    return useContext(ErrorContext);
}
