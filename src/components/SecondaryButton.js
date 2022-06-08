import { StyleSheet, TouchableOpacity } from "react-native";
import { Buttons, TextHierarchy } from "../styles/Theme";
import CustomText from "./CustomText";

const SecondaryButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <CustomText style={styles.buttonText}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    ...Buttons.secondary,
  },
  buttonText: {
    ...TextHierarchy.buttonSecondary,
  },
});
