import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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

async function getData(collectionName, option) {
  const { field, condition, value } = option;
  const collect = collection(db, collectionName);
  const q = query(collect, where(field, condition, value));
  const snapshot = await getDocs(q);
  // const resultData = snapshot.docs.map(doc => ({
  //   docId: doc.id,
  //   ...doc.data()
  // }))
  const resultData = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };
  return resultData;
}

async function getMember(values) {
  const { email, password } = values;
  const collect = collection(db, "member");
  const q = query(collect, where("email", "==", email));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;

  let message;
  let memberObj = {};
  if (docs.length == 0) {
    message = "이메일이 올바르지 않습니다.";
  } else {
    const memberData = { ...docs[0].data(), docId: docs[0].id };
    if (password === memberData.password) {
      message = "로그인에 성공했습니다.";
      memberObj = {
        email: memberData.email,
        docId: memberData.docId,
      };
    } else {
      message = "비밀번호가 일치하지 않습니다.";
    }
  }
  return { memberObj, message };
}

export { getDatas, getData, getMember };
