import React from "react";
import Input from "../03/Input";
import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  ${Input} {
    display: block;
    width: 100%;
    margin: 8px 0 16px;
    box-sizing: border-box;
  }
`;

function Practice2(props) {
  return (
    <Container>
      <h1>로그인</h1>
      <label htmlFor="email">Email</label>
      <Input id="email" placeholder="styled@DW.kr" />
      <label htmlFor="password">Password</label>
      <Input id="password" placeholder="비밀번호" />
    </Container>
  );
}

export default Practice2;