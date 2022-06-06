import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { getData } from "../functions/LocalStorageFunctions";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/UserAtom";
import { getUser } from "../functions/AuthFunctions";

const LoadingScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    const getOnboardingStatus = () => {
      auth.onAuthStateChanged(async (user) => {
        const onboardingStatus = await getData("onboarding"); //get onboarding status
        if (user) {
          const userData = await getUser();
          setUser(userData);
          navigation.replace("Main");
        } else {
          //check if onboarding is not done and redirect to "WELCOME", otherwise to "AUTH"
          setUser(null);
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
