import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAt7hFBh1JECA92mabhPjQAPJkHBahPL1Q",
  authDomain: "dwos-36759.firebaseapp.com",
  projectId: "dwos-36759",
  storageBucket: "dwos-36759.appspot.com",
  messagingSenderId: "487899796886",
  appId: "1:487899796886:web:6fe6b8c4db1cf5a72a79b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firebase에서 데이터를 가져옵니다.
async function getDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
}

export { getDatas };
