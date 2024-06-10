const firebaseConfig = {
    apiKey: "AIzaSyBK-lYtS0MRJyn5EIoCrFsMqT3dUNQeQ50",
    authDomain: "myproject-337a3.firebaseapp.com",
    projectId: "myproject-337a3",
    storageBucket: "myproject-337a3.appspot.com",
    messagingSenderId: "8256987388",
    appId: "1:8256987388:web:05765c4ea8d4ab5d65b779",
  };

  // Initialize Firebase (firebase 객체는 선언한 것이 아닌 위에 선언되어 있는 script에 들어있음)
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  // console.log(db);

  async function getDatas(collectionName) {
    const querySnapshot = await db.collection(collectionName).get();
    return querySnapshot;
  }

  async function addDatas(collectionName, addObj){
    const result =  await db.collection(collectionName).add(addObj);
    return result;
  }

  async function deleteDatas(collectionName, docId) {
    try{
        await db.collection(collectionName).doc(docId).delete();
        return true;
    }catch (error){
        return false;
    }
  }