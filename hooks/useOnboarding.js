import {createContext, useContext, useMemo, useState} from "react";

const OnboardingContext = createContext({});

export const OnboardingProvider = ({children}) => {
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

    const markOnboardingComplete = async () => {
        setIsOnboardingComplete(true);
    }

    const memoedValue = useMemo(() => ({
        isOnboardingComplete,
        setIsOnboardingComplete,
    }), [isOnboardingComplete, setIsOnboardingComplete]);

    return (
        <OnboardingContext.Provider value={memoedValue}>
            {children}
        </OnboardingContext.Provider>
    )
}

export default function useOnboarding() {
    return useContext(OnboardingContext);
}
