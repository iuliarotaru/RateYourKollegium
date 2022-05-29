import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetPassword } from "../../functions/AuthFunctions";
import { useState } from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    const success = await resetPassword(email);
    if (success) {
      setEmail("");
      Alert.alert("Success", "your email has been sent", [
        {
          text: "OK",
          onPress: () => navigation.replace("Login"),
        },
      ]);
    }
  };

  return (
    <SafeAreaView>
      <Text>Add your email to reset your password</Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="email" />
      <Button
        onPress={() => handleResetPassword()}
        title="Reset password"
      ></Button>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({});
