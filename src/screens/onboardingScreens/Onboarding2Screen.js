import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Containers } from "../../styles/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton";

const Onboarding2Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Onboarding2Screen</Text>
      <PrimaryButton
        onPress={() => navigation.replace("Onboarding3")}
        title="Next"
      ></PrimaryButton>
    </SafeAreaView>
  );
};

export default Onboarding2Screen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
});
