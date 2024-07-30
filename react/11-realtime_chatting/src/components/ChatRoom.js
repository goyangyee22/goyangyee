import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { addDatas, db } from "../api/firebase";

function ChatRoom({ auth }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(auth);

  const sendMessage = async (e) => {
    e.preventDefault();

    // 저장할 데이터 객체 생성 (text, createdAt, photoUrl, uid)
    const { uid, photoURL } = auth?.currentUser;
    const addObj = {
      text: inputValue,
      createdAt: serverTimestamp(),
      uid: uid,
      photoURL: photoURL,
    };

    // 데이터베이스에 객체를 저장
    await addDatas("messages", addObj);

    // inputValue를 빈 문자열로 셋팅
    setInputValue = "";
  };

  useEffect(() => {
    const collect = collection(db, "messages");
    const q = query(collect, orderBy("createdAt"), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs);
      // snapshot.forEach((doc) => {
      //   console.log(doc.data());
      // });
    });
  }, []);

  return (
    <>
      <main>
        <ChatMessage />
      </main>
      <form onSubmit={sendMessage}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit" disabled={!inputValue}>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
