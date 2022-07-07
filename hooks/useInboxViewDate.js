import {createContext, useContext, useEffect, useMemo, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const InboxViewDateContext = createContext({});

export const InboxViewDateProvider = ({children}) => {
    const [lastViewedDateEpochMillis, setLastViewedDateEpochMillis] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem('lastViewedDateEpochMillis').then(value => {
            if (!!value) {
                setLastViewedDateEpochMillis(parseInt(value));
            }
        });
    }, []);

    const viewInbox = async () => {
        const date = Date.now();
        setLastViewedDateEpochMillis(date);
        await AsyncStorage.setItem('lastViewedDateEpochMillis', `${date}`);
    }

    const memoedValue = useMemo(() => ({
        lastViewedDateEpochMillis,
        viewInbox,
    }), [lastViewedDateEpochMillis, viewInbox]);

    return (
        <InboxViewDateContext.Provider value={memoedValue}>
            {children}
        </InboxViewDateContext.Provider>
    )
}

export default function useInboxViewDate() {
    return useContext(InboxViewDateContext);
}