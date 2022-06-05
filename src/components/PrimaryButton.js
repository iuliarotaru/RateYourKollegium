import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Buttons, TextHierarchy } from "../styles/Theme";

const PrimaryButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
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
