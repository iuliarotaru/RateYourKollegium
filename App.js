import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/onboardingScreens/WelcomeScreen";
import Onboarding1Screen from "./src/screens/onboardingScreens/Onboarding1Screen";
import Onboarding2Screen from "./src/screens/onboardingScreens/Onboarding2Screen";
import Onboarding3Screen from "./src/screens/onboardingScreens/Onboarding3Screen";
import AuthScreen from "./src/screens/authScreens/AuthScreen";
import RegisterScreen from "./src/screens/authScreens/RegisterScreen";
import LoginScreen from "./src/screens/authScreens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import "./src/config/firebase";
import { RecoilRoot } from "recoil";
import ResetPasswordScreen from "./src/screens/authScreens/ResetPasswordScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { Colors } from "./src/styles/Theme";

//Create a stack navigator for the navigations
const Stack = createNativeStackNavigator();

//Entry point of the solution
export default function App() {
  //Load fonts
  let [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    //RecoilRoot required by RecoilJS
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{ headerShown: false, headerTintColor: Colors.dark }}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false, headerTintColor: Colors.dark }}
            />
            <Stack.Screen
              name="Onboarding1"
              component={Onboarding1Screen}
              options={{ headerShown: false, headerTintColor: Colors.dark }}
            />
            <Stack.Screen
              name="Onboarding2"
              component={Onboarding2Screen}
              options={{ headerShown: false, headerTintColor: Colors.dark }}
            />
            <Stack.Screen
              name="Onboarding3"
              component={Onboarding3Screen}
              options={{ headerShown: false, headerTintColor: Colors.dark }}
            />
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerTintColor: Colors.dark }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerTintColor: Colors.dark }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
              options={{ headerTintColor: Colors.dark }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false, headerTintColor: Colors.dark }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
