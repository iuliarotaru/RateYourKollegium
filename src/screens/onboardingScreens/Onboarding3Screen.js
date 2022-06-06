import { StyleSheet, Text, Image, SafeAreaView } from "react-native";
import { Containers, TextHierarchy } from "../../styles/Theme";
import { storeData } from "../../functions/LocalStorageFunctions";
import PrimaryButton from "../../components/PrimaryButton";

const Onboarding3Screen = ({ navigation }) => {
  const handleOnPress = () => {
    storeData("onboarding", false); //true TODO: change back
    navigation.replace("Auth");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../images/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>Onboarding3Screen</Text>
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
