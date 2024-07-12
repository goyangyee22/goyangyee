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
  margin: 8px;
  width: 400px;
  height: 40px;
  font-size: 16px;

  &:hover {
    background-color: #7462a4;
  }
`;

export default Button;
