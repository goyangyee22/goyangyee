import React from "react";
import styled from "styled-components";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: #fff;
  padding: 16px;
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
`;

const InputSize = styled.input`
  background-color: #f2f2f2;
  border: 2px solid "#eeeeee";
  padding: 16px;
  outline: none; // outline: none을 지정하지 않으면 border가 #000이 됨
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  border-radius: 4px;
`;

const Container = styled.div`
  ${Button}, ${InputSize} {
    margin: 10px;
  }
`;

function Reuse(props) {
  return <div></div>;
}

export default Reuse;
