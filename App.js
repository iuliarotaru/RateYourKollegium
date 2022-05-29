import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding1"
            component={Onboarding1Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding2"
            component={Onboarding2Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding3"
            component={Onboarding3Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
