import React from "react";
import Button from "./Button";
import styled from "styled-components";
import kakao from "./kakao.svg";

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  width: 400px;
  margin: 0 auto;

  & > h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #ff9966, #ff5e62);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  & > label {
    align-self: flex-start;
  }
`;

const Emphasize = styled.div`
  color: #6750a4;
  text-decoration: underline;
`;

const H4Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const KakaoLogin = styled.button`
  background-color: yellow;
  background-image: url(${kakao});
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 35%;
  border: transparent;
  color: #000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 8px;
  width: 400px;
  height: 40px;
  font-size: 16px;
  padding-left: 24px;

  &:hover {
    background-color: #e4ee05;
  }
`;

const Input = styled.input`
  display: inline-block;
  border-top: none;
  border-left: none;
  border-right: none;
  border-color: #d2d2d2;
  width: 390px;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 16px;

  &:focus {
    border-color: #6750a4;
    outline: none;
  }
`;

function Login(props) {
  return (
    <Container>
      <h1>DW 온라인스쿨</h1>
      <H4Tag>
        회원이 아니신가요? <Emphasize>회원가입 하기</Emphasize>
      </H4Tag>
      <label>이메일</label>
      <Input type="text" placeholder="styled@DW.kr" />
      <label>비밀번호</label>
      <Input type="password" placeholder="비밀번호" />
      <Button>로그인 하기</Button>
      <KakaoLogin>카카오 로그인</KakaoLogin>
    </Container>
  );
}

export default Login;
