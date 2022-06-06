import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Buttons, TextHierarchy } from "../styles/Theme";

const SecondaryButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
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
