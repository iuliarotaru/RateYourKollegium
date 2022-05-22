import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth, db, storage } from "../config/firebase";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export const getKollegiums = (setKollegiums) => {
  const kollegiumsUnsubscribe = onSnapshot(
    collection(db, "kollegiums"),
    (snapshot) => {
      const kollegiumsData = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setKollegiums(kollegiumsData);
    }
  );

  return kollegiumsUnsubscribe;
};
