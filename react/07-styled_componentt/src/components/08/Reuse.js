import React from "react";
import styled, { css } from "styled-components";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const fontSize = css`
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
`;

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: #fff;
  padding: 16px;
  /* font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px; */
  ${fontSize}
`;

const InputSize = styled.input`
  background-color: #f2f2f2;
  border: 2px solid "#eeeeee";
  padding: 16px;
  outline: none; // outline: none을 지정하지 않으면 border가 #000이 됨
  /* font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px; */
  ${fontSize}
  border-radius: 4px;
`;

const Container = styled.div`
  ${Button}, ${InputSize} {
    margin: 10px;
  }
`;

function Reuse(props) {
  return (
    <Container>
      <h2>Button</h2>
      <Button size="small">small</Button>
      <Button size="medium">medium</Button>
      <Button size="large">large</Button>
      <h2>Input</h2>
      <InputSize size="small" />
      <InputSize size="medium" />
      <InputSize size="large" />
    </Container>
  );
}

export default Reuse;
