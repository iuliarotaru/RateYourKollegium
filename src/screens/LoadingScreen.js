import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { getData } from "../functions/localStorageFunctions";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      } else {
        navigation.replace("Welcome");
        //check if onboarding is not done and redirect to "WELCOME", otherwise to "AUTH"
      }
    });
  });
  return (
    <SafeAreaView>
      <ActivityIndicator />
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
