import { db, storage } from "../config/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";

//Get all articles
export const getArticles = (setArticles) => {
  const articlesUnsubscribe = onSnapshot(
    collection(db, "articles"),
    (snapshot) => {
      const articlesData = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setArticles(articlesData);
    }
  );

  return articlesUnsubscribe;
};

//Fetch image url from path
export const getImageUrl = async (path) => {
  return await getDownloadURL(ref(storage, path));
};
