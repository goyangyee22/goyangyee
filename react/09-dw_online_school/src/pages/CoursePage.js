import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Button from "../components/Button";
import Card from "../components/Card";
import { useLocation, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData } from "../api/firebase";
import styles from "./CoursePage.module.css";

let listItems;

function CoursePage() {
  //   const props = useLocation();
  const { courseSlug } = useParams();

  const [course, setCourse] = useState();
  const [keyword, setKeyword] = useState([]);

  //   ?.의 의미는 undefined이거나 null이면 (course?.code)의 평가를 멈추고 undefined를 반환함.
  const courseColor = getCourseColor(course?.code);

  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
    console.log(resultData);
  };

  const handleClick = () => {};

  useEffect(() => {
    handleLoad();
  }, []);

  const { title, summary } = course;
  return (
    <>
      <div className={styles.header}>
        <Container className={styles.content}>
          <CourseIcon />
          <h1 className={styles.title}>{course.title}</h1>
          <Button>+ 코스 담기</Button>
          <p className={styles.summary}>{course.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        <Card className={styles.topic}>
          <h3 className={styles.title}>title</h3>
          <p className={styles.summary}>summary</p>
        </Card>
      </Container>
    </>
  );
}

export default CoursePage;
