import React, { useState } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import { addDatas } from "../api/firebase";

const INITIAL_VALUES = {
  title: "",
  content: "",
  calorie: 0,
  imgUrl: null,
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm(props) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultData = await addDatas("foodit", values);
  };
  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        className="FoodForm-preview"
        onChange={handleChange}
        name="imgUrl"
        value={values.imgUrl}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            name="title"
            className="FoodForm-title"
            onChange={handleInputChange}
            placeholder="제목을 입력해주세요."
            type="text"
            value={values.title}
          />
          <input
            name="calorie"
            className="FoodForm-calorie"
            placeholder="칼로리를 입력해주세요."
            onChange={handleInputChange}
            type="number"
            min={1}
            value={values.calorie}
          />
          <button className="FoodForm-submit-button" type="submit">
            확인
          </button>
        </div>
        <textarea
          name="content"
          className="FoodForm-content"
          placeholder="내용을 입력해주세요."
          onChange={handleInputChange}
          value={values.content}
        />
      </div>
    </form>
  );
}

export default FoodForm;
