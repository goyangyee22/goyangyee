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
  where,
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

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits, lastQuery } = queryOption;
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

  // startAfter 조건
  if (lastQuery) {
    q = query(q, startAfter(lastQuery));
  }

  // limit 조건
  q = query(q, limit(limits));

  return q;
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

async function updateDatas(collectionName, docId, updateObj, imgUrl) {
  const docRef = await doc(db, collectionName, docId);

  // 저장돼있는 시간 관련 필드들의 값이 밀리세컨드로 돼있기 때문에 getTime() 함수 사용
  const time = new Date().getTime();

  // 사진 파일을 변경하지 않았을 때
  if (updateObj.imgUrl === null) {
    // 사진이 변경되지 않았을 때 imgUrl 값이 null이 돼서
    // 문서를 update하면 imgUrl 값이 null이 됩니다.
    // 그래서 updateObj에서 imgUrl 프로퍼티를 삭제합니다.
    delete updateObj["imgUrl"];
  } else {
    // 사진파일을 변경했을 때 => 기존 사진 삭제
    const storage = getStorage();
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    // 변경한 사진을 스토리지에 저장
    const url = await uploadImage(createPath("foodit/"), updateObj.imgUrl);

    // 스토리지에 저장하고 그 파일의 url을 가져와서 updateObj의 imgUrl 값을 변경
    // 기존 updateObj에 있는 imgUrl은 'File'객체이고
    // DB에 저장해야 할 imgUrl은 문자열 url이기 때문
    updateObj.imgUrl = url;
  }

  // updatedAt 필드에 넣어줄 시간 데이터를 updateObj에 넣음
  updateObj.updatedAt = time;

  // 문서 필드 데이터 수정
  await updateDoc(docRef, updateObj);
  const docSnap = await getDoc(docRef);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
}

async function getDatasOrderByLimit(collectionName, options) {
  const q = getQuery(collectionName, options);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  const resultData = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return { resultData, lastQuery };
}

async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}

async function getSearchDatas(collectionName, options) {
  const q = query(
    getCollection(collectionName),
    where("title", ">=", options.keyword),
    where("title", "<=", options.keyword + "\uf8ff"),
    limit(options.limits)
  );
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}

export const addData = async (item) => {
  try {
    const docRef = await db.collection("foodit").add(item);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("ADD Error: ", error);
  }
};

export const updateData = async (item) => {
  try {
    const { id, ...data } = item;
    await db.collection("foodit").doc(id).update(data);
    return { id, ...data };
  } catch (error) {
    console.error("UPDATE Error: ", error);
  }
};

export const deleteData = async (docId) => {
  try {
    await db.collection("footit").doc(docId).delete();
    return docId;
  } catch (error) {
    console.error("DELETE Error: ", error);
  }
};

export {
  db,
  addDatas,
  deleteDatas,
  updateDatas,
  getSearchDatas,
  getDatasOrderByLimit,
  getDatas,
};
