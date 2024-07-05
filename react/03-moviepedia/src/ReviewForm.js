import React, { useState } from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

function ReviewForm(props) {
  const [values, setValues] = useState({});
  const [item, setItem] = useState(1);

  const handleChange = (name, value) => {
    setItem(2);
    // { ...prevValues, [name]: value } 여기서 앞 () 붙여줘야 객체로 인식함
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    // console.log(e.target.name, e.target.value);
    // name에 변수 처리를 합니다. [] 안 붙여주면 key 값으로 들어감
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <form className="ReviewForm">
      <div>
        <FileInput inputName="imgUrl" setFile={handleChange} />
      </div>
      <div className="Form-container">
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          onChange={handleInputChange}
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
        />
        <button>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
