import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaUaLdWnAak1e3MwiTw7jR5jZM-ksoQk0",
  authDomain: "chatting-b1739.firebaseapp.com",
  projectId: "chatting-b1739",
  storageBucket: "chatting-b1739.appspot.com",
  messagingSenderId: "673841937568",
  appId: "1:673841937568:web:4b2e2a97889d8c18e35dc5",
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

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}

async function handleCollect() {
  const collect = collection(db, "messages");
  const q = query(collect, orderBy("createdAt"), limit(100));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setMessages(resultData);
  });

  return () => {
    unsubscribe();
  };
}

export { db, getUserAuth, addDatas, handleCollect };
