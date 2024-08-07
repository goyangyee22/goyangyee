import React from "react";
import Input from "../09/Input";
import styled from "styled-components";
import src from "./search.png";

const SearchInput = styled(Input)`
  background-image: url(${src});
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: 12px 50%;
  padding-left: 40px;
`;

export function Practice(props) {
  return (
    <div>
      <h2>Input</h2>
      <Input />
      <h2>Search Input</h2>
      <SearchInput />
    </div>
  );
}
