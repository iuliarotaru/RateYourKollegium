import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "./../functions/AuthFunctions";
import { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <SafeAreaView>
      <Text>login screen</Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="email" />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="password"
      />
      <Button onPress={() => handleLogin()} title="Login"></Button>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
