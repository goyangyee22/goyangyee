import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handlePlus = () => {
    // count + 1하고 App 컴포넌트(코드) 재실행(재렌더링)
    setCount(count + 1);
  };

  const handleMinus = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    console.log("카운트에 변화가 있을 때마다 실행 됨");
  }, [count]);

  return (
    <div className="App">
      <p>Count: {count}</p>
      <button onClick={handlePlus}>plus</button>
      <button onClick={handleMinus}>minus</button>
    </div>
  );
}

export default App;
