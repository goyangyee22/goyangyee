import React from "react";
// import ListPage from "../components/ListPage";
// import styled from "styled-components";
import CourseListPage from "./CourseListPage";

function CourseListPage({ children }) {
  return (
    <ListPage>
      heading="커뮤니티" description="DW온라인스쿨의 2만 수강생들과 함께
      공부해봐요."
    </ListPage>
  );
}

export default CourseListPage;
