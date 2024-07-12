import styled from "styled-components";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const InputSize = styled.input`
  background-color: #f2f2f2;
  border: 2px solid ${({ $error }) => ($error ? "#f44336" : "#eeeeee")};
  color: #000;
  padding: 16px;
  outline: none; // outline: none을 지정하지 않으면 border가 #000이 됨
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
  border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};

  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#eeeeee")};
  }
`;

export default InputSize;
