import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Auth</Text>
      <Button
        onPress={() => navigation.navigate("Register")}
        title="Register"
      ></Button>
      <Button
        onPress={() => navigation.navigate("Login")}
        title="Login"
      ></Button>
      <TouchableOpacity onPress={() => navigation.replace("Main")}>
        <Text>Continue without registering</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
