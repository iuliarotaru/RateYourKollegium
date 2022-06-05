import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Containers } from "../../styles/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { storeData } from "../../functions/LocalStorageFunctions";
import PrimaryButton from "../../components/PrimaryButton";

const Onboarding3Screen = ({ navigation }) => {
  const handleOnPress = () => {
    storeData("onboarding", false); //true TODO: change back
    navigation.replace("Auth");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Onboarding3Screen</Text>
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
});
