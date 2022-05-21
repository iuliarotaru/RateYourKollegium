import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { getData } from "../functions/LocalStorageFunctions";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const getOnboardingStatus = () => {
      auth.onAuthStateChanged(async (user) => {
        const onboardingStatus = await getData("onboarding");
        if (user) {
          navigation.replace("Home");
        } else {
          //check if onboarding is not done and redirect to "WELCOME", otherwise to "AUTH"
          if (onboardingStatus) {
            navigation.replace("Auth");
          } else {
            navigation.replace("Welcome");
          }
        }
      });
    };

    getOnboardingStatus();
  });

  return (
    <SafeAreaView>
      <ActivityIndicator />
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
