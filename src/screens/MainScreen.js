import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import ProfileScreen from "./ProfileScreen";
import DiscoverScreen from "./discoverScreens/DiscoverScreen";
import HomeScreen from "./homeScreens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/UserAtom";
import ManageScreen from "./ManageScreen";
import { Colors } from "../styles/Theme";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />
      {user?.role === "admin" && (
        <Tab.Screen
          name="Manage"
          component={ManageScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cog" color={color} size={size} />
            ),
            headerShown: true,
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
