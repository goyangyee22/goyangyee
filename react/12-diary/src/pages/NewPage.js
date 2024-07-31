import React, { useEffect } from "react";

function NewPage(props) {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "감정 일기장 - 새 일기";
  }, []);
  return <div></div>;
}

export default NewPage;
