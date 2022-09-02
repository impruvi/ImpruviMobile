import React, {createContext, useContext, useMemo} from 'react';
import GoogleAnalyticsClient from "../google-analytics-client/googleAnalyticsClient";

const GoogleAnalyticsClientContext = createContext({});

export const GoogleAnalyticsClientProvider = ({children}) => {

    const gaClient = new GoogleAnalyticsClient();

    const memoedValue = useMemo(() => ({
        gaClient,
    }), [gaClient]);

    return (
        <GoogleAnalyticsClientContext.Provider value={memoedValue}>
            {children}
        </GoogleAnalyticsClientContext.Provider>
    )
}

export default function useGoogleAnalyticsClient() {
    return useContext(GoogleAnalyticsClientContext);
}
