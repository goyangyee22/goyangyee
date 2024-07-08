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

async function addDatas(collectionName, dataObj) {
  try {
    // uuid: 128bit의 고유 식별자
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);

    dataObj.imgUrl = url;

    // createdAt ,updatedAt ==> 현재 날짜를 밀리세컨즈로 바꿔서
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    // id 필드의 값 ==> 가장 큰 id + 1
    const lastId = await getLastNum(collectionName, "id");
    dataObj.id = lastId + 1;

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    const result = await addDoc(collect, dataObj);
    // 하나의 문서만 가져와야 돼서 getDoc
    const docSnap = await getDoc(result); // result ==> documentReference
    const resultData = { ...docSnap.data(), docId: docSnap.id };
    return resultData;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
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

// Storage에 데이터를 저장하는 함수
async function uploadImage(path, imgFile) {
  // Storage 객체 가져오기
  const storage = getStorage();

  // 저장할 이미지 객체 생성
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);

  // 저장한 File의 url 가져오기(이미지를 클릭했을 때 나오는 url)
  const url = await getDownloadURL(imageRef);
  return url;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. Storage 객체 가져온다.
  const storage = getStorage();

  try {
    // 2. Storage에서 이미지 삭제
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    // 3. 컬렉션에서 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, dataObj, docId) {
  // console.log(imgUrl);
  // console.log(dataObj.imgUrl);
  // doc(db, 컬렉션명, 문서ID);
  // getDoc(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  const docRef = await doc(db, collectionName, docId);

  // 수정할 데이터 양식 생성 => title, content, rating, updatedAt, imgUrl
  const time = new Date().getTime();
  dataObj.updatedAt = time;

  // 사진파일이 수정되면 => 기존 사진 삭제 => 새로운 사진 추가 => url 받아와서 imgUrl 값 셋팅
  if (dataObj.imgUrl !== null) {
    // 기존사진 url 가져오기
    const docSnap = await getDoc(docRef);
    const prevImgUrl = docSnap.data().imgUrl;

    // 스토리지에서 기본사진 삭제
    const storage = getStorage();
    const deleteRef = ref(storage, prevImgUrl);
    await deleteObject(deleteRef);

    // 새로운사진 추가
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);
    dataObj.imgUrl = url;
  } else {
    // imgUrl 프로퍼티 삭제
    delete dataObj["imgUrl"];
  }
  // 사진파일이 수정되지 않으면 => 변경데이터만 업데이트
  await updateDoc(docRef, dataObj);
  const updatedData = await getDoc(docRef); // getDocs().docs.map(doc => {})
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
