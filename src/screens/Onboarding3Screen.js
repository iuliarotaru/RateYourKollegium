import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { storeData } from "../functions/localStorageFunctions";

const Onboarding3Screen = ({ navigation }) => {
  const handleOnPress = () => {
    storeData({ onboardingDone: true });
    navigation.replace("Auth");
  };

  return (
    <SafeAreaView>
      <Text>Onboarding3Screen</Text>
      <Button onPress={() => handleOnPress()} title="Next"></Button>
    </SafeAreaView>
  );
};

export default Onboarding3Screen;

const styles = StyleSheet.create({});
