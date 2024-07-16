import React from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import cn from "classnames";
import catalogImg from "../assets/catalog.svg";

function ListPage({ texts, heading, description }) {
  return (
    <>
      <div className={cn(styles.bg, styles.community)}>
        <img className={styles.icon} src={catalogImg} />
        <div className={styles.texts}>{texts}
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
