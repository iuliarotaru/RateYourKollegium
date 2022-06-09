import { Alert } from "react-native";
import { db, storage } from "../config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

//Get all kollegiums
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

//Add comment to kollegium
export const addCommentsToKollegium = async (
  comment,
  image,
  rating,
  username,
  kollegiumId
) => {
  try {
    //Reference to the current kollegium
    const kollegiumRef = doc(db, "kollegiums", kollegiumId);

    //If image exists, upload it first
    let fileSnapshot = null;
    if (image) {
      const storageRef = ref(storage, `comments/${uuidv4()}`);
      fileSnapshot = await uploadBytes(storageRef, image);
    }

    //Add the comment to the kollegium
    await updateDoc(kollegiumRef, {
      comments: arrayUnion({
        createdAt: new Date(),
        username,
        text: comment,
        image: image ? fileSnapshot.metadata.fullPath : "",
        rating,
      }),
    });
  } catch (error) {
    Alert.alert("Error", getErrorMessage(error.code));
  }
};

//Add kollegium to user's saved kollegiums
export const saveKollegium = async (userId, kollegiumId) => {
  try {
    const userRef = doc(db, "usersData", userId);

    await updateDoc(userRef, {
      savedKollegiums: arrayUnion(kollegiumId),
    });
  } catch (error) {
    Alert.alert("Error", getErrorMessage(error.code));
  }
};

//Remove kollegium from user's saved kollegiums
export const removeSavedKollegium = async (userId, kollegiumId) => {
  try {
    const userRef = doc(db, "usersData", userId);

    await updateDoc(userRef, {
      savedKollegiums: arrayRemove(kollegiumId),
    });
  } catch (error) {
    Alert.alert("Error", getErrorMessage(error.code));
  }
};

//Fetch image url from path
export const getImageUrl = async (path) => {
  try {
    return await getDownloadURL(ref(storage, path));
  } catch (error) {}
};
