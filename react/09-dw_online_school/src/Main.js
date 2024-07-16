import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";

function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
