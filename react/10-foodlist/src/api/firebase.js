import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  startAfter,
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
  addObj.createdAt = time;
  addObj.updatedAt = time;

  // 컬렉션에 저장
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
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

async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. Storage 객체 가져온다. ==> 파일명(경로포함) or 파일 url
  const storage = getStorage();
  let message;

  try {
    // 2. 삭제할 파일의 참조객체를 생성하여(ref 함수) Storage에서 이미지 삭제
    message = "이미지 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    // 3. 삭제할 문서의 참조객체 생성(doc 함수)
    message = "문서 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    const deleteDocRef = doc(db, collectionName, docId);
    await deleteDoc(deleteDocRef);
    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
}

async function updateDatas(collectionName, dataObj, docId) {
  // doc(db, 컬렉션명, 문서ID);
  // getDoc(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  console.log("updateDatas 함수 실행");
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
    const path = `foodit/${uuid}`;
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

async function getDatasOrderByLimit(collectionName, options) {
  const { fieldName, limits } = options;
  let q;
  if (!options.lq) {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      limit(limits)
    );
  } else {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      startAfter(options.lq),
      limit(limits)
    );
  }
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  const resultData = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return { resultData, lastQuery };
}

export { db, addDatas, deleteDatas, updateDatas, getDatasOrderByLimit };
