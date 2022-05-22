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
  updateDoc,
  arrayUnion,
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

export const addCommentsToKollegium = async (
  comment,
  username,
  kollegiumId
) => {
  //Reference to the current kollegium
  const kollegiumRef = doc(db, "kollegiums", kollegiumId);

  await updateDoc(kollegiumRef, {
    comments: arrayUnion({ username, text: comment }),
  });

  console.log(comment, username, kollegiumId);
};
