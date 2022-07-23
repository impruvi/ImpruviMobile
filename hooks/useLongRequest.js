import {createContext, useContext, useEffect, useMemo, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useHttpClient from "./useHttpClient";

const LongRequestContext = createContext({});


// This hook is used to store outstanding async network requests.
export const LongRequestProvider = ({children}) => {

    const {httpClient} = useHttpClient();

    const [outstandingRequests, setOutstandingRequests] = useState([]);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        const requestsJSON = await AsyncStorage.getItem('outstandingLongRequests');
        if (!!requestsJSON) {
            const requests = JSON.parse(requestsJSON);

            setOutstandingRequests(requests);
            await executeRequests(requests);
        }
    }

    const saveOutstandingRequests = async (requests) => {
        const json = JSON.stringify(requests);
        await AsyncStorage.setItem('outstandingLongRequests', json);
        setOutstandingRequests(requests);
    }

    const addRequest = async (request) => {
        const newRequests = [...outstandingRequests, request];
        await saveOutstandingRequests(newRequests);
        await executeRequests(newRequests);
    }

    const executeRequests = async (requests) => {
        const failedRequests = (await Promise.all(requests
            .map(async request => {
                try {
                    await httpClient[request.operation](request.input, request.requestId, (progress) => {
                        setOutstandingRequests(requests.map(req => {
                            if (req.requestId === request.requestId) {
                                req.progress = progress;
                                return req;
                            }
                            return req;
                        }));
                    });
                    return null;
                } catch (e) {
                    console.log('Exception while processing request: ', request);
                    console.log(e);
                    return request;
                }
            }))).filter(request => !!request);
        await saveOutstandingRequests(failedRequests);

        if (failedRequests.length > 0) {
            setTimeout(() => {
                executeRequests(failedRequests);
            }, 60000); // retry once a minute until it finally succeeds
        }
    }

    const memoedValue = useMemo(() => ({
        executeLongRequest: addRequest,
        outstandingLongRequests: outstandingRequests
    }), [addRequest]);

    return (
        <LongRequestContext.Provider value={memoedValue}>
            {children}
        </LongRequestContext.Provider>
    )
}

export default function useLongRequest() {
    return useContext(LongRequestContext);
}
