import { StyleSheet, Image, SafeAreaView } from "react-native";
import { Containers, TextHierarchy } from "../../styles/Theme";
import { storeData } from "../../functions/LocalStorageFunctions";
import PrimaryButton from "../../components/PrimaryButton";
import CustomText from "../../components/CustomText";

const Onboarding3Screen = ({ navigation }) => {
  const handleOnPress = () => {
    //Save that the onboarding has been completed
    storeData("onboarding", true);
    navigation.replace("Auth");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../images/onboarding3.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <CustomText style={styles.tagline}>
        Leave a detailed review to help other students.
      </CustomText>
      <PrimaryButton
        onPress={() => handleOnPress()}
        title="Next"
      ></PrimaryButton>
    </SafeAreaView>
  );
};

export default Onboarding3Screen;

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
