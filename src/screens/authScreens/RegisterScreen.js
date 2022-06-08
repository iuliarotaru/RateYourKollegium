import { StyleSheet, TextInput } from "react-native";
import { register } from "../../functions/AuthFunctions";
import { getDocumentAsync } from "expo-document-picker";
import { Inputs, Containers } from "../../styles/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import CustomText from "../../components/CustomText";
import { useState } from "react";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [contract, setContract] = useState(null);
  const [contractDetails, setContractDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await register(username, email, password, school, contract);
      setIsLoading(false);
    }
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
        placeholder="Username"
        style={styles.textInput}
        autoComplete="username"
        textContentType="username"
        placeholderTextColor="black"
      />
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        style={styles.textInput}
        autoComplete="email"
        textContentType="emailAddress"
        placeholderTextColor="black"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        style={styles.textInput}
        placeholderTextColor="black"
        textContentType="newPassword"
        secureTextEntry={true}
      />
      <TextInput
        onChangeText={setSchool}
        value={school}
        placeholder="School"
        style={styles.textInput}
        placeholderTextColor="black"
      />
      <SecondaryButton
        onPress={() => handleFileInput()}
        title={contractDetails ? "Remove Contract" : "Upload Contract"}
      />
      <CustomText style={styles.contractDetails}>{contractDetails}</CustomText>
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
