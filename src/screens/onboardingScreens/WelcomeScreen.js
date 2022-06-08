import { StyleSheet, Image, SafeAreaView } from "react-native";
import { Containers, TextHierarchy } from "../../styles/Theme";
import PrimaryButton from "../../components/PrimaryButton";
import CustomText from "../../components/CustomText";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../images/logo.png")}
        style={{ height: 200, maxWidth: "100%", marginBottom: 20 }}
        resizeMode="contain"
      />
      <CustomText style={styles.tagline}>
        Find a student housing in Denmark
      </CustomText>
      <PrimaryButton
        title={"Continue"}
        onPress={() => navigation.replace("Onboarding1")}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    ...Containers.main,
  },
  tagline: {
    ...TextHierarchy.heading2,
    marginBottom: 50,
  },
});
