import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KollegiumsScreen from "./KollegiumsScreen";
import KollegiumsDetailsScreen from "./KollegiumsDetailsScreen";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Kollegiums"
        component={KollegiumsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="KollegiumsDetails"
        component={KollegiumsDetailsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
