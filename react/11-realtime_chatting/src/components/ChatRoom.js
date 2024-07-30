import React, { useEffect, useRef, useState } from "react";
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
import { addDatas, db, handleCollect } from "../api/firebase";

function ChatRoom({ auth }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const dummy = useRef();

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
    setInputValue("");
  };

  useEffect(() => {
    handleCollect();
    // const collect = collection(db, "messages");
    // const q = query(collect, orderBy("createdAt"), limit(100));

    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   const resultData = snapshot.docs.map((doc) => doc.data());
    //   setMessages(resultData);
    // });

    // return () => {
    //   unsubscribe();
    // };
  }, []);

  // 채팅이 올라오면 scroll의 위치가 <span ref={dummy}></span>으로 이동함
  useEffect(() => {
    // scrollIntoView() 함수는 자신이 호출된 요소가 사용자에게 표시되도록 상위 컨테이너를 스크롤
    // true의 경우 scroll이 제일 위로 가고 false의 경우 scroll이 제일 밑으로 감
    // { behavior: "smooth" }는 스크롤이 부드럽게 내려갈 수 있게 합니다.
    // (true or false) {behavior}는 둘 중 하나만 들어가야함
    // block은 start, center, end, nearest의 값을 사용
    dummy.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);

  return (
    <>
      <main>
        {messages.map((message, idx) => {
          return <ChatMessage key={idx} message={message} auth={auth} />;
        })}
        <span ref={dummy}></span>
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
