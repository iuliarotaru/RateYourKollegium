import { StyleSheet, TouchableOpacity } from "react-native";
import { Buttons, TextHierarchy } from "../styles/Theme";
import CustomText from "./CustomText";

const PrimaryButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <CustomText style={styles.buttonText}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    ...Buttons.primary,
  },
  buttonText: {
    ...TextHierarchy.button,
  },
});
