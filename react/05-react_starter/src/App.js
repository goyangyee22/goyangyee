import { useState } from "react";
import "./App.css";

function App() {
  const [num, setNum] = useState(0);

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const handleClick = () => {
    setNum(num + 1);
  };

  // div의 내용을 반환합니다.
  // React에서는 화면의 내용을 변환하고 싶으면 useState()를 활용해야 합니다.
  return (
    <div>
      {/* input에 입력한 값이 console.log에 나옵니다. */}
      <input
        type="handleChange"
        placeholder="Search here"
        onChange={handleChange}
      />
      <h2>입력한 값: </h2>
      {/* h1: Click me 버튼을 누를 때 마다 초기값 0부터 1씩 증가합니다. */}
      <h1>{num}</h1>
      {/* onClick: handleClick 함수의 내용을 가져와서 실행합니다. */}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
