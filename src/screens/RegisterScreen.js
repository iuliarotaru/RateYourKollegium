import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { register } from "./../functions/AuthFunctions";
import { Alert } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [contract, setContract] = useState("");

  const handleRegister = () => {
    register(username, email, password, school, contract);
  };

  return (
    <SafeAreaView>
      <Text>register screen</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder="username"
      />
      <TextInput onChangeText={setEmail} value={email} placeholder="email" />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="password"
      />
      <TextInput onChangeText={setSchool} value={school} placeholder="school" />
      <TextInput
        onChangeText={setContract}
        value={contract}
        placeholder="file input contract"
      />
      <Button onPress={() => handleRegister()} title="Register"></Button>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
