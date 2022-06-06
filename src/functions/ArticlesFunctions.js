import { db, storage } from "../config/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";

export const getArticles = (setArticles) => {
  const articlesUnsubscribe = onSnapshot(
    collection(db, "articles"),
    (snapshot) => {
      const articlesData = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setArticles([...articlesData, ...articlesData, ...articlesData]);
    }
  );

  return articlesUnsubscribe;
};

export const getImageUrl = async (path) => {
  return await getDownloadURL(ref(storage, path));
};
