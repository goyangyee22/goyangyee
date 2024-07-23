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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfL1ZwQrGCTIJjmIbIfIumRmhNUV-0eRc",
  authDomain: "foodlist-80478.firebaseapp.com",
  projectId: "foodlist-80478",
  storageBucket: "foodlist-80478.appspot.com",
  messagingSenderId: "21939302896",
  appId: "1:21939302896:web:6525718c4a6cd8cb712d35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장 ==> 스토리지의 이미지 url을 addObj의 imgUrl 값으로 변경
  const path = createPath("foodit/");
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;

  // id 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  addObj.id = lastId;

  // 시간 정보 생성
  // createdAt, updatedAt ==> 현재 날짜를 밀리세컨즈로 표시
  const time = new Date().getTime();
  dataObj.createdAt = time;
  dataObj.updatedAt = time;

  // 컬렉션에 저장
  await addDoc(getCollection(collectionName), addObj);
}

async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName),
    orderBy(field, "desc"), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

// Firebase에서 데이터를 가져옵니다.
async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}

// 데이터를 특정한 조건에 맞춰 정렬하는 함수입니다.
async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  // query(컬렉션정보, 조건1, 조건2, 조건3...)
  const q = query(collect, orderBy(options.order, "desc"));
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}

async function getDatasByOrderLimit(collectionName, options) {
  const collect = await collection(db, collectionName);
  let q;
  if (options.lq) {
    q = query(
      collect,
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }
  // query(컬렉션정보, 조건1, 조건2, 조건3...)
  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];
  console.log(lastQuery);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return { resultData, lastQuery };
}

// 데이터를 삭제합니다.
async function deleteDatas(collectionName, docId, imgUrl) {
  // Storage 객체를 가져옵니다.
  const storage = getStorage();

  try {
    // Storage에서 이미지를 삭제합니다.
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    // collection에서 문서를 삭제합니다.
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

// 데이터를 업데이트합니다.
async function updateDatas(collectionName, dataObj, docId) {
  const docRef = await doc(db, collectionName, docId);

  // 수정할 데이터 양식을 생성합니다. => title, content, calorie, updatedAt, imgUrl
  const time = new Date().getTime();
  dataObj.updatedAt = time;

  // 사진파일이 수정되면 기존 사진을 삭제하고 새로운 사진을 추가해 url을 받아와 imgUrl 값을 셋팅합니다.
  if (dataObj.imgUrl !== null) {
    // 기존사진의 url을 가져옵니다.
    const docSnap = await getDoc(docRef);
    const prevImgUrl = docSnap.data().imgUrl;

    // 스토리지에서 기본사진 삭제
    const storage = getStorage();
    const deleteRef = ref(storage, prevImgUrl);
    await deleteObject(deleteRef);

    // 새로운 사진 추가
    const uuid = crypto.randomUUID();
    const path = `foodit/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);
    dataObj.imgUrl = url;
  } else {
    // imgUrl 프로퍼티 삭제
    delete dataObj["imgUrl"];
  }

  // 사진파일이 수정되지 않으면 => 변경데이터만 업데이트
  await updateDoc(docRef, dataObj);
  const updatedData = await getDoc(docRef);
  const resultData = { docId: updatedData.id, ...updatedData.data() };
  return resultData;
}

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
};
