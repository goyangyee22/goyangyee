import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDoc,
  runTransaction,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1QnjDFHT-nTDnl2aoCZFMZ5K-TyTxWuw",
  authDomain: "diary-b710f.firebaseapp.com",
  projectId: "diary-b710f",
  storageBucket: "diary-b710f.appspot.com",
  messagingSenderId: "390553122299",
  appId: "1:390553122299:web:b63b627e844bead31e475e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) return 0;
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  const condition = [
    { field: "text", operator: "==", value: "test" },
    { field: "uid", operator: "==", value: "xjdiwjKDJ2jdkxJND2J" },
  ];

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });

  // limit 조건
  q = query(q, limit(limits));

  return q;
}

export async function addDatas(collectionName, addObj) {
  try {
    // runTransaction()은 데이터의 일관성 보장, 여러 작업을 원자적으로 수행
    const resultData = await runTransaction(db, async (tr) => {
      const lastId = (await getLastNum(collectionName, "id")) + 1;
      addObj.id = lastId;
      const docRef = await addDoc(getCollection(collectionName), addObj);
      const snapshot = await getDoc(docRef);
      const docData = snapshot.exists()
        ? { ...snapshot.data(), docId: snapshot.id }
        : null;
      return docData;
    });
    return resultData;
  } catch (error) {
    console.log("Error transaction: ", error);
  }
}

export async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}

export async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updateObj);
    const snapshot = await getDoc(docRef);
    const resultData = { ...snapshot.data(), docId: snapshot.id };
    return resultData;
  } catch (error) {
    console.log("Error Update: ", error);
  }
}

export async function deleteDatas(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.log("Error Delete: ", error);
  }
}

export { getCollection, getUserAuth };
