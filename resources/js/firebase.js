import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBK-lYtS0MRJyn5EIoCrFsMqT3dUNQeQ50",
  authDomain: "myproject-337a3.firebaseapp.com",
  projectId: "myproject-337a3",
  storageBucket: "myproject-337a3.appspot.com",
  messagingSenderId: "8256987388",
  appId: "1:8256987388:web:05765c4ea8d4ab5d65b779",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
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

async function deleteDatas(collectionName, docId){
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, updateInfoObj){
  // doc(db, 컬렉션명, 문서ID);
  // getDoc(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  const docRef = await doc(db, collectionName, docId);
  // const docData = await getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
}

export { db, getDatas, addDatas, deleteDatas, updateDatas };
