import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../../functions/AuthFunctions";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { Inputs, Containers } from "../../styles/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="email"
        style={styles.textInput}
        autoComplete="email"
        textContentType="username"
        placeholderTextColor="black"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        style={styles.textInput}
        placeholderTextColor="black"
        textContentType="password"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => navigation.replace("ResetPassword")}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <PrimaryButton
        onPress={() => handleLogin()}
        title="Login"
        style={{ marginTop: 20 }}
      ></PrimaryButton>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

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
  forgotPasswordText: {
    marginTop: 10,
  },
});
