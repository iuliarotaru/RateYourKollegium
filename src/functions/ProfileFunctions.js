import { auth, db } from "../config/firebase";
import { onSnapshot, doc } from "firebase/firestore";

export const getUser = (user, setUser) => {
  const userUnsubscribe = onSnapshot(
    doc(db, "usersData", auth.currentUser.uid),
    (doc) => {
      const userData = doc.data();
      setUser({ ...user, ...userData });
    }
  );

  return userUnsubscribe;
};
