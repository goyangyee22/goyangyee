import styled from "styled-components";

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    background-color: black;

    /* &는 상위 요소인 span을 의미함 */
    &:hover {
      background-color: white;
    }
  }

  &:hover {
    background-color: yellow;
  }
`;

export default Box;
