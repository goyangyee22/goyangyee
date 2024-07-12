import React, { useState } from "react";
import InputSize from "./InputSize";
import styled from "styled-components";

const Container = styled.div`
  ${InputSize} {
    margin: 10px;
  }
`;

export function Practice(props) {
  return (
    <Container>
      <h1>Size</h1>
      <InputSize size="small" placeholder="small" />
      <InputSize size="medium" placeholder="medium" />
      <InputSize size="large" placeholder="large" />
      <h1>Round</h1>
      <InputSize placeholder="Round" $round />
      <h1>Error</h1>
      <InputSize placeholder="Error" $error />
    </Container>
  );
}
