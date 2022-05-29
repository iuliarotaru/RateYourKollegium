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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

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
  image,
  rating,
  username,
  kollegiumId
) => {
  //Reference to the current kollegium
  const kollegiumRef = doc(db, "kollegiums", kollegiumId);

  if (image) {
    const storageRef = ref(storage, `comments/${uuidv4()}`);
    const fileSnapshot = await uploadBytes(storageRef, image);
  }

  await updateDoc(kollegiumRef, {
    comments: arrayUnion({
      username,
      text: comment,
      image: image ? fileSnapshot.metadata.fullPath : "",
      rating,
    }),
  });
};

export const getImageUrl = async (path, setImage) => {
  const downloadedUrl = await getDownloadURL(ref(storage, path));
  setImage(downloadedUrl);
};
