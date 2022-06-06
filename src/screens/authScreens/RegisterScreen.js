import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { register } from "../../functions/AuthFunctions";
import { Alert } from "react-native";
import { getDocumentAsync } from "expo-document-picker";
import { Inputs, Containers } from "../../styles/Theme";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-web";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PrimaryButton from "../../components/PrimaryButton";

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
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder="username"
        style={styles.textInput}
        autoComplete="username"
        textContentType="username"
        placeholderTextColor="black"
      />
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="email"
        style={styles.textInput}
        autoComplete="email"
        textContentType="emailAddress"
        placeholderTextColor="black"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        style={styles.textInput}
        placeholderTextColor="black"
        textContentType="newPassword"
        secureTextEntry={true}
      />
      <TextInput
        onChangeText={setSchool}
        value={school}
        placeholder="school"
        style={styles.textInput}
        placeholderTextColor="black"
      />
      <Button
        onPress={() => handleFileInput()}
        title={contractDetails ? "Remove Contract" : "Upload Contract"}
      ></Button>
      <Text style={styles.contractDetails}> {contractDetails} </Text>
      <PrimaryButton onPress={() => handleRegister()} title="Register" />
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
  textInput: {
    ...Inputs.text,
  },
  keyboardContainer: {
    flex: 1,
  },
  contractDetails: {
    marginBottom: 15,
  },
});
