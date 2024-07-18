import React, { useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Button from "../components/Button";
import Card from "../components/Card";
import { useLocation, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData } from "../api/firebase";

function CoursePage() {
  //   const props = useLocation();
  const { courseSlug } = useParams();

  const [course, setCourse] = useState();

  //   ?.의 의미는 undefined이거나 null이면 (course?.code)의 평가를 멈추고 undefined를 반환함.
  const courseColor = getCourseColor(course?.code);

  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
  };

  return (
    <>
      <div>
        <Container>
          <CourseIcon />
          <h1>머신 러닝 실전</h1>
          <Button>+ 코스 담기</Button>
          <p>
            머신 러닝이 우리 생활 속에서 어디에 사용되고, 어떻게 적용되는지 실전
            예제를 통해 알아 보아요!
          </p>
        </Container>
      </div>
      <Container>
        <Card>
          <h3>추천 시스템</h3>
          <p>
            추천 시스템이란 무엇이고, 우리 생활에 어떤 영향을 미치고 있을까요?
            이번 토픽에서 추천 시스템이 우리의 생활을 어떻게 지배하고 있는지를
            배워봅시다!
          </p>
        </Card>
      </Container>
    </>
  );
}

export default CoursePage;
