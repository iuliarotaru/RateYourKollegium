import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Containers } from "../../styles/Theme";
import PrimaryButton from "../../components/PrimaryButton";

const AuthScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Auth</Text>
      <PrimaryButton
        onPress={() => navigation.navigate("Register")}
        title="Register"
        style={{ marginBottom: 20 }}
      />
      <PrimaryButton
        onPress={() => navigation.navigate("Login")}
        title="Login"
        style={{ marginBottom: 20 }}
      />
      <TouchableOpacity onPress={() => navigation.replace("Main")}>
        <Text>Continue without registering</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
});
