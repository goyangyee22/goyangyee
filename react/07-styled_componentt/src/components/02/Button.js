import React from "react";
import styled from "styled-components";
import src from "./nail.png";

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const StyledButton = styled.button`
  background-color: #6750a4;
  border: none;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  &:hover {
    ${Icon} {
      opacity: 0.2;
    }
  }

  & ${Icon} {
    margin-right: 4px;
  }
`;

function Button({ children }) {
  return (
    <StyledButton>
      <Icon src={src} />
      {children}
    </StyledButton>
  );
}

export default Button;
