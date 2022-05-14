import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>home screen</Text>
      <Button onPress={() => auth.signOut()} title="Signout"></Button>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
