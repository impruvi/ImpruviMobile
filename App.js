import {AuthProvider} from "./hooks/useAuth";
import {HttpClientProvider} from "./hooks/useHttpClient";
import Navigator from "./navigator/Navigator";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer>
          <AuthProvider>
              <HttpClientProvider>
                  <Navigator />
              </HttpClientProvider>
          </AuthProvider>
      </NavigationContainer>
  );
}
