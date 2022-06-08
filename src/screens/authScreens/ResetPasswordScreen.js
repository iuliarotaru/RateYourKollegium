import { StyleSheet, TextInput, Alert } from "react-native";
import { resetPassword } from "../../functions/AuthFunctions";
import PrimaryButton from "../../components/PrimaryButton";
import { Inputs, Containers } from "../../styles/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../../components/CustomText";
import { useState } from "react";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    const success = await resetPassword(email);
    if (success) {
      setEmail("");
      Alert.alert("Success", "A reset password email has been sent.", [
        {
          text: "OK",
          onPress: () => navigation.replace("Login"),
        },
      ]);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <CustomText>Add your email to reset your password</CustomText>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        style={styles.textInput}
        autoComplete="email"
        textContentType="username"
        placeholderTextColor="black"
      />
      <PrimaryButton
        onPress={() => handleResetPassword()}
        title="Reset password"
        style={{ marginTop: 20 }}
      />
    </KeyboardAwareScrollView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
  textInput: {
    ...Inputs.text,
  },
});
