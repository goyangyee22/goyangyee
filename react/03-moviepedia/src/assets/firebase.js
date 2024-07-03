import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOz5ccuPc0fmqmzewrTfFhA1BA1q2x8Ac",
  authDomain: "movie-food.firebaseapp.com",
  projectId: "movie-food",
  storageBucket: "movie-food.appspot.com",
  messagingSenderId: "210523693445",
  appId: "1:210523693445:web:0b271fc3457e802cee24ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

async function addDatas(collectionName, dataObj) {
  // 문서 ID 수동
  try {
    //   const saveDoc = await doc(db, collectionName, '4');
    //   console.log(`doc() 결과: ${saveDoc}`);
    //   const saveResult = await setDoc(saveDoc, dataObj);
    //   console.log(`setdoc() 결과: ${saveResult}`);

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj); // 결과 == undefined
    return true;
  } catch (error) {
    return false;
  }
}

async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db, 컬렉션명, 문서ID);
  // getDoc(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  const docRef = await doc(db, collectionName, docId);
  // const docData = await getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
}

export { db, getDatas, addDatas, deleteDatas, updateDatas };
