import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import mock from "../lib/mock.json";
import { useEffect, useState } from "react";

async function App() {
  const [mbti, setMbti] = useState([]);
  const source = mock;
  const response = await fetch(source);
  const data = await response.json();
  setMbti(data);
  console.log(data);

  useEffect(() => {
    console.log("최초 렌더링 시 실행");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="new" element={<New />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
