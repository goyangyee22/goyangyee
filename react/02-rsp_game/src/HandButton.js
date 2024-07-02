import React from "react";
import HandIcon from "./HandIcon";
import "./HandButton.css";

function HandButton({ value, onClick }) {
  return (
    <button className="HandButton" onClick={onClick}>
      <HandIcon className="HandButton-icon" value={value} />
    </button>
  );
}

export default HandButton;
