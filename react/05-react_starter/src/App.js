import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [num, setNum] = useState(0);
  const [text, setText] = useState("");

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };
  const handleClick = () => {
    setNum(num + 1);
  };

  const inputChange = (e) => {
    const nextText = e.target.value;
    setText(nextText);
  };

  // div의 내용을 반환합니다.
  // React에서는 화면의 내용을 변환하고 싶으면 useState()를 활용해야 합니다.
  // useState()는 다시 렌더링 한다는 게 중요

  // useEffect() 최초 렌더링될 때만 실행 됨 [] 때문에
  useEffect(() => {
    console.log("나는 화면이 최초 렌더링될 때 실행되는 uef야.");
  }, []); // [](디펜던시 리스트) 안에는 react가 무엇을 지켜볼 지 작성해준다.

  useEffect(() => {
    console.log("나는 count가 변경될 때 실행되는 uef야.");
  }, [num]);

  useEffect(() => {
    console.log("나는 count가 변경될 때 실행되는 uef야.");
  }, [text]);
  return (
    <div>
      {/* input에 입력한 값이 console.log에 나옵니다. */}
      <input
        type="handleChange"
        placeholder="Search here"
        onChange={inputChange}
      />
      <h2>입력한 값: {text}</h2>
      {/* h1: Click me 버튼을 누를 때 마다 초기값 0부터 1씩 증가합니다. */}
      <h1>{num}</h1>
      {/* onClick: handleClick 함수의 내용을 가져와서 실행합니다. */}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
