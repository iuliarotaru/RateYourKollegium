import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { register } from "../../functions/AuthFunctions";
import { Alert } from "react-native";
import { getDocumentAsync } from "expo-document-picker";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [contract, setContract] = useState(null);
  const [contractDetails, setContractDetails] = useState("");

  const handleRegister = () => {
    //TODO: Validate fields

    register(username, email, password, school, contract);
  };

  const handleFileInput = async () => {
    if (contractDetails) {
      setContract(null);
      setContractDetails("");
    } else {
      let result = await getDocumentAsync({ type: "application/pdf" });
      if (result != null && result.type === "success") {
        const fetchResponse = await fetch(result.uri);
        const fileBlob = await fetchResponse.blob();
        setContract(fileBlob);
        setContractDetails(result.name);
      }
    }
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
      <Button
        onPress={() => handleFileInput()}
        title={contractDetails ? "Remove Contract" : "Upload Contract"}
      ></Button>
      <Text> {contractDetails} </Text>
      <Button onPress={() => handleRegister()} title="Register"></Button>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
