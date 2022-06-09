import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth, db, storage } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { sendPasswordResetEmail } from "firebase/auth";
import { getErrorMessage } from "./HelperFunctions";

//Register user functinoality
export const register = async (username, email, password, school, contract) => {
  try {
    //Create user account
    await createUserWithEmailAndPassword(auth, email, password);

    //Update its data inside the "usersData" collection
    const currentUser = auth.currentUser;
    const storageRef = ref(storage, `contracts/${currentUser.uid}`);
    const fileSnapshot = await uploadBytes(storageRef, contract);
    await setDoc(doc(db, "usersData", currentUser.uid), {
      username,
      school,
      contract: fileSnapshot.metadata.fullPath,
      role: "user",
      savedKollegiums: [],
    });
  } catch (error) {
    console.log(error.message);
    Alert.alert("Error", getErrorMessage(error.code));
  }
};

//Login user functinoality
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    Alert.alert("Error", getErrorMessage(error.code));
  }
};

//Get current user and all its data
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
      user.savedKollegiums = data.savedKollegiums || [];
    }
    return user;
  } catch (error) {
    Alert.alert("Error", getErrorMessage(error.code));
  }
};

//Reset current user's password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    Alert.alert("Error", getErrorMessage(error.code));
  }
};
