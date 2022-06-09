import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { login } from "../../functions/AuthFunctions";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Inputs, Containers } from "../../styles/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/CustomText";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handle login functionality
  const handleLogin = () => {
    login(email, password);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        style={styles.textInput}
        autoComplete="email"
        textContentType="username"
        placeholderTextColor="black"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        style={styles.textInput}
        placeholderTextColor="black"
        textContentType="password"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => navigation.replace("ResetPassword")}>
        <CustomText style={styles.forgotPasswordText}>
          Forgot password?
        </CustomText>
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
