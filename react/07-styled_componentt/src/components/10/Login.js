import React from "react";
import Button from "./Button";
import styled from "styled-components";
import kakao from "./kakao.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 400px;
  margin: 40px auto;

  & > h1 {
    font-family: Pretendard;
    text-align: center;
    font-size: 40px;
    background: linear-gradient(135deg, aqua, purple);
    background-clip: text;
    color: transparent;
  }

  & > label {
    align-self: flex-start;
  }
`;

const H4Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const KakaoLogin = styled(Button)`
  background-color: yellow;
  background-image: url(${kakao});
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 35%;
  border: transparent;
  color: #000;
  padding-right: 8px;

  &:hover {
    background-color: #e4ee05;
  }
`;

const Input = styled.input`
  display: block;
  border: none;
  border-bottom: 2px solid #d2d2d2;
  border-color: #d2d2d2;
  width: 100%;
  font-size: 16px;
  padding: 8px 0;
  margin-bottom: 16px;

  &:focus {
    border-color: #6750a4;
    outline: none;
  }

  &::placeholder {
    color: #c4c5cd;
  }
`;

const Label = styled.label`
  color: #e1c6f7;
`;

function Login(props) {
  return (
    <Container>
      <h1>DW 온라인스쿨</h1>
      <H4Tag>
        회원이 아니신가요? <Link>회원가입 하기</Link>
      </H4Tag>
      <form>
        <Label htmlFor="email">이메일</Label>
        <Input type="text" id="email" placeholder="styled@DW.kr" />
        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="password" placeholder="비밀번호" />
        <Button>로그인 하기</Button>
        <KakaoLogin>카카오 로그인</KakaoLogin>
      </form>
    </Container>
  );
}

export default Login;
