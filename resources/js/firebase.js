import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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

async function getDatas(collectionName){
    const collect = await collection(db, collectionName)
    const snapshot = await getDocs(collect);

    return snapshot;
}

export { db, getDatas };
