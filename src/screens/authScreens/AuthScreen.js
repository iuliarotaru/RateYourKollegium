import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Containers } from "../../styles/Theme";
import PrimaryButton from "../../components/PrimaryButton";
import CustomText from "../../components/CustomText";

const AuthScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <PrimaryButton
        onPress={() => navigation.navigate("Register")}
        title="Register"
        style={{ marginBottom: 20 }}
      />
      <PrimaryButton
        onPress={() => navigation.navigate("Login")}
        title="Login"
        style={{ marginBottom: 20 }}
      />
      <TouchableOpacity onPress={() => navigation.replace("Main")}>
        <CustomText>Continue without registering</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
});
