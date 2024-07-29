import React from "react";
import * as FaIcons from "react-icons/fa";
import testImg from "../assets/ralo-profile.png";

function ChatRoom(props) {
  return (
    <>
      <main>
        {"나의 로그인 정보의 경우" ? (
          <div>
            <p>나의 채팅 내용</p>
            <img src={testImg} />
          </div>
        ) : (
          <div>
            <img />
            <p>상대방의 채팅 내용</p>
          </div>
        )}
      </main>
      <form>
        <input />
        <button>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
