import styled from "styled-components";

const Button = styled.button`
  background-color: #6750a4;
  color: white;
  cursor: pointer;
  border: #6750a4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 24px;

  &:hover {
    background-color: #7462a4;
  }
`;

export default Button;
