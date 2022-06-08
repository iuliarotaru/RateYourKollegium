import { StyleSheet, Image, SafeAreaView } from "react-native";
import { Containers, TextHierarchy } from "../../styles/Theme";
import PrimaryButton from "../../components/PrimaryButton";
import CustomText from "../../components/CustomText";

const Onboarding1Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../images/onboarding1.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <CustomText style={styles.tagline}>
        Discover a generous list of kollegiums from all over Denmark and filter
        it by your priorities.
      </CustomText>
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
