import { StyleSheet, Text, Image, SafeAreaView } from "react-native";
import { Containers, TextHierarchy } from "../../styles/Theme";
import PrimaryButton from "../../components/PrimaryButton";

const Onboarding1Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../images/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>Onboarding1Screen</Text>
      <PrimaryButton
        onPress={() => navigation.replace("Onboarding2")}
        title="Next"
      ></PrimaryButton>
    </SafeAreaView>
  );
};

export default Onboarding1Screen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
  tagline: {
    ...TextHierarchy.heading2,
    marginBottom: 50,
  },
  image: {
    height: 200,
    maxWidth: "100%",
    marginBottom: 20,
  },
});
