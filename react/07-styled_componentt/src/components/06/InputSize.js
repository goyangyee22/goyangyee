import styled from "styled-components";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const InputSize = styled.input`
  background-color: #f2f2f2;
  border: ${({ $error }) => ($error ? "2px solid red" : "2px solid black")};
  color: #000;
  padding: 16px;
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};

  &:focus {
    background-color: #ffd8d9;
  }
`;

export default InputSize;
