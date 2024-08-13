import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  where,
  getDoc,
  runTransaction,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP0BMK34Pmmdwt6Lp_hYIvea2rMCiC5O0",
  authDomain: "shop-app-30bda.firebaseapp.com",
  projectId: "shop-app-30bda",
  storageBucket: "shop-app-30bda.appspot.com",
  messagingSenderId: "1083407781508",
  appId: "1:1083407781508:web:d766972066a2054a773cd1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(...path) {
  let newPath = path;
  if (typeof path[0] !== "string") {
    // newPath = path;
    newPath = path.flat();
  }
  return collection(db, ...newPath);
}

export function getUserAuth() {
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

export async function getData(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  const resultData = { ...doc.data(), docId: doc.id };
  return resultData;
}

export async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}

export async function joinUser(uid, email) {
  await setDoc(doc(db, "users", uid), { email: email });
}

export async function asyncCart(uid, cartArr) {
  const cartRef = getCollection("users", uid, "cart");
  const batch = writeBatch(db);

  for (const item of cartArr) {
    const result = await updateQuantity(uid, item);
    if (!result) {
      const itemRef = doc(cartRef, item.id.toString());
      batch.set(itemRef, item);
    }
  }
  await batch.commit();
}

export async function updateQuantity(uid, cartItem) {
  const cartRef = getCollection("users", uid, "cart");
  const itemRef = doc(cartRef, cartItem.id.toString());

  // 문서가 존재하는지 확인
  const itemDoc = await getDoc(itemRef);
  if (itemDoc.exists()) {
    const currentData = itemDoc.data();
    const updatedQuantity = (currentData.quantity || 0) + 1;
    await updateDoc(itemRef, { quantity: updatedQuantity });
    return true;
  } else {
    return false;
  }
}

export async function deleteDatas(collectionName, docId) {
  try {
    const cartRef = getCollection(collectionName);
    const docRef = doc(cartRef, docId.toString());
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("문서 삭제 중 오류가 발생했습니다. ", error);
    return false;
  }
}

export async function addCart(collectionName, cartObj) {
  const collectionRef = getCollection(collectionName);
  const cartRef = doc(collectionRef, cartObj.id.toString());
  await setDoc(cartRef, cartObj);
}
