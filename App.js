import {AuthProvider} from "./hooks/useAuth";
import {HttpClientProvider} from "./hooks/useHttpClient";
import Navigator from "./navigator/Navigator";
import {NavigationContainer} from "@react-navigation/native";
import {ErrorProvider} from "./hooks/useError";

export default function App() {
  return (
      <NavigationContainer>
          <AuthProvider>
              <ErrorProvider>
                  <HttpClientProvider>
                      <Navigator />
                  </HttpClientProvider>
              </ErrorProvider>
          </AuthProvider>
      </NavigationContainer>
  );
}
