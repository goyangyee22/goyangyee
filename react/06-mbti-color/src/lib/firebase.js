import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACSfDmK993dHOCxSSoSphBOb2V-7c1-R4",
  authDomain: "mbti-project-2e81f.firebaseapp.com",
  projectId: "mbti-project-2e81f",
  storageBucket: "mbti-project-2e81f.appspot.com",
  messagingSenderId: "728122301056",
  appId: "1:728122301056:web:4bb857b82d9fb75e252465",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order, lq) {
  const collect = collection(db, collectionName);
  // 데이터를 n개씩 로딩하는 limit(n) 함수입니다.
  let q = query(collect, orderBy(order, "desc"), limit(10));
  if (lq) {
    q = query(collect, orderBy(order, "desc"), startAfter(lq), limit(10));
  }
  const querySnapshot = await getDocs(q);
  const lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return { resultData, lastQuery };

  // debugger를 사용하면 console에서 미리 코드를 작성하며 확인해볼 수 있음
  // debugger는 실제로 실무에서 많이 쓰임
  // debugger;
}
async function addDatas(collectionName, dataObj) {
  const collect = collection(db, collectionName);

  // id 값 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;

  // 날짜 생성
  const time = new Date().getTime();

  // 추가할 data 객체에 필요한 필드 정보 추가
  dataObj.id = lastId;
  dataObj.createdAt = time;
  dataObj.updatedAt = time;

  // 문서에 data 객체 저장
  const result = await addDoc(collect, dataObj);
  return result;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

export { getAllDatas, addDatas };
