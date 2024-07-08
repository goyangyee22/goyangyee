import React, { useState } from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null,
};

function ReviewForm({
  // addData, handleAddSuccess App에서 호출 되는 prop을 받기 위해 사용
  addData,
  handleAddSuccess,
  // initialPreview, initialValues, handleCancel ReviewList에서 호출 되는 prop을 받기 위해 사용
  initialPreview,
  initialValues = INITIAL_VALUE,
  handleCancel,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [item, setItem] = useState(1);

  const handleChange = (name, value) => {
    // setItem(2);
    // { ...prevValues, [name]: value } 여기서 앞 () 붙여줘야 객체로 인식함
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    // console.log(e.target.name, e.target.value);
    // name에 변수 처리를 합니다. [] 안 붙여주면 key 값으로 들어감
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = async (e) => {
    // 웬만하면 최상위 컴포넌트에서 작성하는 게 좋음 (여기서는 App.js)
    e.preventDefault();

    // 버튼 비활성화 (작업 중인 상태)
    setIsSubmitting(true);
    const result = await addData("movie", values);
    handleAddSuccess(result);

    // 버튼 활성화 (작업 중이 아닌 상태)
    setIsSubmitting(false);
    setValues(INITIAL_VALUE);
  };

  return (
    // submit은 form에 이벤트를 달아야 됨 (form에서 이벤트가 일어나기 때문)
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <div>
        <FileInput
          inputName="imgUrl"
          setFile={handleChange}
          value={values.imgUrl}
          initialPreview={initialPreview}
        />
      </div>
      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          onChange={handleInputChange}
          value={values.title}
        />
        <RatingInput
          inputName="rating"
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name="content"
          placeholder="내용을 입력해주세요."
          onChange={handleInputChange}
          value={values.content}
        />
        {handleCancel && (
          <button onClick={() => handleCancel(null)}>취소</button>
        )}
        <button type="submit" disabled={isSubmitting}>
          확인
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
