import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Buttons, Colors, Containers, TextHierarchy } from "../../styles/Theme";
import { TouchableOpacity } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>rateYourKollegium</Text>
      <Text style={styles.tagline}>Find a student housing in Denmark</Text>
      <PrimaryButton
        title={"Continue"}
        onPress={() => navigation.replace("Onboarding1")}
        style={{ marginTop: 50 }}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
  tagline: {
    ...TextHierarchy.heading2,
  },
});
