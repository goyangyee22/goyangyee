import React, { useState } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import { addDatas } from "../api/firebase";
import { useLocale } from "./../contexts/LocaleContext";
import useTranslate from "./../hooks/useTranslate";

const INITIAL_VALUE = {
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

function FoodForm({
  onSubmit,
  handleSubmitSuccess,
  initialPreview,
  initialValues = INITIAL_VALUE,
  handleCancel,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const locale = useLocale();
  // const t = useTranslate();
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
    setIsSubmitting(true);
    const resultData = await addDatas("foodit", values);
    handleSubmitSuccess(resultData);
    setIsSubmitting(false);
    setValues(INITIAL_VALUE);
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
            onChange={handleInputChange}
            type="number"
            value={values.calorie}
          />
          <button
            className="FoodForm-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
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
