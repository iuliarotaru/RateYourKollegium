import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticlesScreen from "./ArticlesScreen";
import ArticlesDetailsScreen from "./ArticlesDetailsScreen";

const Stack = createNativeStackNavigator();

const DiscoverScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ArticlesDetails"
        component={ArticlesDetailsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({});
