import React from "react";
import Container from "../components/Container";

function HomePage(props) {
  return (
    <div>
      <Container>
        <div>
          <h1>
            코딩이 처음이라면,
            <br />
            <strong>DWOS</strong>
          </h1>
          <p>
            11만 명이 넘는 비전공자, 코딩 입문자가 DWOS 무제한 멤버십을
            선택했어요.
            <br />
            지금 함께 시작해보실래요?
          </p>
          <div>
            <button>지금 시작하기</button>
          </div>
        </div>
        <div></div>
      </Container>
    </div>
  );
}

export default HomePage;
