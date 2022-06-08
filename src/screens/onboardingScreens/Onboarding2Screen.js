import { StyleSheet, Image, SafeAreaView } from "react-native";
import { Containers, TextHierarchy } from "../../styles/Theme";
import PrimaryButton from "../../components/PrimaryButton";
import CustomText from "../../components/CustomText";

const Onboarding2Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../images/onboarding2.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <CustomText style={styles.tagline}>
        Read reviews from current and former students. See images from their
        rooms and ratings.
      </CustomText>
      <PrimaryButton
        onPress={() => navigation.replace("Onboarding3")}
        title="Next"
      ></PrimaryButton>
    </SafeAreaView>
  );
};

export default Onboarding2Screen;

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
