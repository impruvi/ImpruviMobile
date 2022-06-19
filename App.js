import {AuthProvider} from "./hooks/useAuth";
import {HttpClientProvider} from "./hooks/useHttpClient";
import Navigator from "./navigator/Navigator";
import {NavigationContainer} from "@react-navigation/native";
import {ErrorProvider} from "./hooks/useError";
import {OnboardingProvider} from "./hooks/useOnboarding";

import {
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';


export default function App() {
  return (
      <NavigationContainer>
          <BottomSheetModalProvider>
              <AuthProvider>
                  <ErrorProvider>
                      <OnboardingProvider>
                          <HttpClientProvider>
                              <Navigator />
                          </HttpClientProvider>
                      </OnboardingProvider>
                  </ErrorProvider>
              </AuthProvider>
          </BottomSheetModalProvider>
      </NavigationContainer>
  );
}
