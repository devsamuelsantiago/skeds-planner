import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firestore";

export const getAnonUser = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const savedUid = localStorage.getItem("anonUid");
    if (savedUid) return resolve(savedUid);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("anonUid", user.uid);
        resolve(user.uid);
      } else {
        try {
          const result = await signInAnonymously(auth);
          const uid = result.user.uid;
          localStorage.setItem("anonUid", uid);
          resolve(uid);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};
