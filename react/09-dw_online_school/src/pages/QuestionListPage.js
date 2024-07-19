import React from "react";
import ListPage from "../components/ListPage";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Ralo from "../assets/ralo-profile.png";
import styles from "./QuestionListPage.module.css";

function QuestionListPage() {
  return (
    <ListPage variant="community">
      <Card className={styles.card}>
        <Link>어디가 잘못 된걸까요?</Link> <span>[1]</span>
        <h5 className={styles.date}>2021. 10. 14.</h5>
        <img className={styles.img} src={Ralo} />
      </Card>
    </ListPage>
  );
}

export default QuestionListPage;
