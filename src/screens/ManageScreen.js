import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";

const ManageScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>manage screen</Text>
    </SafeAreaView>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({});
