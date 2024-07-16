import React from "react";
import ListPage from "../components/ListPage";
import styled from "styled-components";

function CourseListPage() {
  const texts = "불편하면 자세를 고쳐 앉아."
const heading = "됐냐?"
const description = "겠냐?"

  return (
    <ListPage texts={texts} heading={heading} description={description}/>
  );
}

export default CourseListPage;
