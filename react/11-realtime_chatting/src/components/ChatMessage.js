import React from "react";
import tempImg from "../assets/ralo-profile.png";

function ChatMessage(props) {
  return (
    <>
      <div className="message sent">
        <img src={tempImg} />
        <p>내가 보낸 채팅 내용</p>
      </div>
      <div className="message received">
        <img src={tempImg} />
        <p>상대방의 채팅 내용</p>
      </div>
    </>
  );
}

export default ChatMessage;
