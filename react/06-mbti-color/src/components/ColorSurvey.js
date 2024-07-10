import React, { useState } from "react";
import styles from "./ColorSurvey.module.css";

function ColorSurvey({ mbtiData }) {
  return (
    <div className={styles.colorSurvey}>
      <div className={styles.id}>{mbtiData.id}</div>
      <div className={styles.mbti}>{mbtiData.mbti}</div>
      <div className={styles.arrow}>
        <img className={styles.arrowIcon} src="/images/arrow.svg" />
      </div>
      <div
        className={styles.colorChip}
        style={{ backgroundColor: mbtiData.colorCode }}
      ></div>
      <div className={styles.colorCode}>{mbtiData.colorCode}</div>
    </div>
  );
}

export default ColorSurvey;
