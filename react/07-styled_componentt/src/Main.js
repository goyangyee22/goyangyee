import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import HelloStyled from "./components/01/HelloStyled";
import Nesting from "./components/02/Nesting";
import { Practice as Practice1 } from "./components/03/Practice";
import Practice2 from "./components/04/Practice2";

function Main(props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="01" element={<HelloStyled />} />
            <Route path="02" element={<Nesting />} />
            <Route path="03" element={<Practice1 />} />
            <Route path="04" element={<Practice2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
