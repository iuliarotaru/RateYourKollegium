import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../config/firebase";

export const register = async (username, email, password, school, contract) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};
