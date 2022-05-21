import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth, db, storage } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export const register = async (username, email, password, school, contract) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const currentUser = auth.currentUser;
    const storageRef = ref(storage, `contracts/${currentUser.uid}`);
    const fileSnapshot = await uploadBytes(storageRef, contract);
    await setDoc(doc(db, "usersData", currentUser.uid), {
      username,
      school,
      contract: fileSnapshot.metadata.fullPath,
      role: "user",
    });
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

export const getUser = async () => {
  try {
    const docRef = doc(db, "usersData", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const user = { email: auth.currentUser.email, uid: auth.currentUser.uid };
    if (docSnap.exists()) {
      const data = docSnap.data();
      user.username = data.username;
      user.school = data.school;
      user.contract = data.contract;
      user.role = data.role;
    }
    return user;
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};