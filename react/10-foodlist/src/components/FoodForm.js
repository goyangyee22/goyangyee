import React, { useState } from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import useTranslate from "../hooks/useTranslate";
import useAsync from "../hooks/useAsync";

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

function FoodForm({
  onCancel,
  onSubmit,
  onSubmitSuccess,
  initialValues = INITIAL_VALUES,
  initialPreview,
}) {
  const [values, setValues] = useState(initialValues);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const t = useTranslate();

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
    const resultData = await onSubmitAsync("foodit", values);
    setValues(INITIAL_VALUES);
    onSubmitSuccess(resultData);
  };
  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        className="FoodForm-preview"
        onChange={handleChange}
        name="imgUrl"
        value={values.imgUrl}
        initialPreview={initialPreview}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            name="title"
            className="FoodForm-title"
            onChange={handleInputChange}
            placeholder={t("title placeholder")}
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
          {onCancel && (
            <button
              className="FoodForm-cancel-button"
              type="button"
              onClick={() => onCancel(null)}
            >
              {t("cancel button")}
            </button>
          )}
          <button
            className="FoodForm-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {t("confirm button")}
          </button>
        </div>
        <textarea
          name="content"
          className="FoodForm-content"
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
          value={values.content}
        />
      </div>
    </form>
  );
}

export default FoodForm;
