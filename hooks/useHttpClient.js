import React, {createContext, useContext, useMemo} from 'react';
import HttpClient from "../http-client/httpClient";

const HttpClientContext = createContext({});

export const HttpClientProvider = ({children}) => {
    const httpClient = new HttpClient();

    const memoedValue = useMemo(() => ({
        httpClient,
    }), [httpClient]);

    return (
        <HttpClientContext.Provider value={memoedValue}>
            {children}
        </HttpClientContext.Provider>
    )
}

export default function useHttpClient() {
    return useContext(HttpClientContext);
}
