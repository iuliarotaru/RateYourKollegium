import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import Onboarding1Screen from "./src/screens/Onboarding1Screen";
import Onboarding2Screen from "./src/screens/Onboarding2Screen";
import Onboarding3Screen from "./src/screens/Onboarding3Screen";
import AuthScreen from "./src/screens/AuthScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import "./src/config/firebase";
import { RecoilRoot } from "recoil";

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
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Button onPress={() => navigation.goBack()} title="Back" />
              ),
            })}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Button onPress={() => navigation.goBack()} title="Back" />
              ),
            })}
          />
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
