import {createContext, useContext, useMemo, useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingContext = createContext({});

export const OnboardingProvider = ({children}) => {
    const [isLoadingOnboarding, setIsLoadingOnBoarding] = useState(false);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('isOnboardingComplete').then(value => {
            if (!!value && value === 'true') {
                setIsOnboardingComplete(true);
            }
            setIsLoadingOnBoarding(false);
        });
    }, []);

    const markOnboardingComplete = async () => {
        setIsOnboardingComplete(true);
        await AsyncStorage.setItem('isOnboardingComplete', 'true');
    }

    const memoedValue = useMemo(() => ({
        isOnboardingComplete,
        isLoadingOnboarding,
        markOnboardingComplete,
    }), [isOnboardingComplete, isLoadingOnboarding, markOnboardingComplete]);

    return (
        <OnboardingContext.Provider value={memoedValue}>
            {children}
        </OnboardingContext.Provider>
    )
}

export default function useOnboarding() {
    return useContext(OnboardingContext);
}
