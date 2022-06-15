import {AuthProvider} from "./hooks/useAuth";
import {HttpClientProvider} from "./hooks/useHttpClient";
import Navigator from "./navigator/Navigator";
import {NavigationContainer} from "@react-navigation/native";
import {ErrorProvider} from "./hooks/useError";
import {
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';


export default function App() {
  return (
      <NavigationContainer>
          <BottomSheetModalProvider>
              <AuthProvider>
                  <ErrorProvider>
                      <HttpClientProvider>
                          <Navigator />
                      </HttpClientProvider>
                  </ErrorProvider>
              </AuthProvider>
          </BottomSheetModalProvider>
      </NavigationContainer>
  );
}
