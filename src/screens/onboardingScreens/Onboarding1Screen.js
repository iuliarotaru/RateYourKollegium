import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Containers } from "../../styles/Theme";
import PrimaryButton from "../../components/PrimaryButton";

const Onboarding1Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Onboarding1Screen</Text>
      <PrimaryButton
        onPress={() => navigation.replace("Onboarding2")}
        title="Next"
      ></PrimaryButton>
    </SafeAreaView>
  );
};

export default Onboarding1Screen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
});
