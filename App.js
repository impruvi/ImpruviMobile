import {AuthProvider} from "./hooks/useAuth";
import {HttpClientProvider} from "./hooks/useHttpClient";
import Navigator from "./navigator/Navigator";
import {NavigationContainer} from "@react-navigation/native";
import {ErrorProvider} from "./hooks/useError";
import {PushProvider} from "./hooks/usePush";

export default function App() {
  return (
      <NavigationContainer>
          <AuthProvider>
              <ErrorProvider>
                  <HttpClientProvider>
                      <PushProvider>
                        <Navigator />
                      </PushProvider>
                  </HttpClientProvider>
              </ErrorProvider>
          </AuthProvider>
      </NavigationContainer>
  );
}
