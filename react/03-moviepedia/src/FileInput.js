import React, { useEffect, useRef, useState } from "react";
import placeholderImg from "./assets/preview-placeholder.png";
import "./FileInput.css";
import resetImg from "./assets/ic-reset.png";

function FileInput({ inputName, setFile, value }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();
  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(inputName, nextFile);
    console.log(e);
  };

  // 업로드한 이미지 취소 버튼을 클릭했을 때의 함수입니다.
  const handleClearClick = () => {
    const inputNode = inputRef;
    console.log(inputNode);
    // inputNode.current.value = "";
    setFile(inputName, null);
  };

  // ReviewForm이 렌더링되면 FileInput이 렌더링 되면서 useEffect 실행
  // useEffect 내부 코드가 실행되고 사진 변경되면 ReviewForm이 재 렌더링됨
  // FileInput도 재 렌더링 되는데 이 때는 useEffect 내부 코드가 실행되는 게 아님

  // useEffect가 실행되는 시점은
  // 1. 최초 렌더링시
  // 2. 디펜던시 리스트에 들어있는 값이 변경될 때
  // 3. 컴포넌트가 unmount될 때

  useEffect(() => {
    // value 값이 없을 수도 있기 때문에 useEffect를 종료한다.
    if (!value) return;

    // ObjectURL 객체를 사용하여 미리보기 기능 구현
    // ObjectURL을 만들면 웹 브라우저에 메모리를 할당하고 해제를 해야 함.
    // ==> 메모리 낭비 방지를 위해서
    // 해제를 하는 시점은 useEffect에서 제공하는 사이드 이펙트를 정리할 때
    // useEffect에서 return을 해줄 때 정리하는 함수를 리턴해주면 사이드 이펙트를 제거할 수 있다.
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    // 디펜던시 리스트에 있는 값이 바뀌면 다시 함수를 실행하는데 이 전에 리액트는
    // 앞에서 리턴한 정리 함수(clean-up 함수)를 실행해서 사이드 이펙트를 정리
    // 재 렌더링 => useEffect 함수 실행 => 그 안에 있는 return 함수 기억
    // => 사용자 파일이 변경되면 value 값 변경으로 인한 useEffect 함수 실행
    // => 앞에서 기억해뒀던 return 함수 실행
    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className="FileInput">
      <img className="FileInput-preview" src={preview || placeholderImg} />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
