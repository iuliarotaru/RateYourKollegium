import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import ProfileScreen from "./ProfileScreen";
import DiscoverScreen from "./discoverScreens/DiscoverScreen";
import HomeScreen from "./homeScreens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/UserAtom";
import ManageScreen from "./ManageScreen";

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      {user?.role === "admin" && (
        <Tab.Screen name="Manage" component={ManageScreen} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
