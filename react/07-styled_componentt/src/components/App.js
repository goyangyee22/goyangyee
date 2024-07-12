import React from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Hello, Styled Components!!</h1>
      <ul>
        <Link to="01">
          <li>1. Styled Components Basic</li>
        </Link>
        <Link to="02">
          <li>2. Nesting 문법</li>
        </Link>
        <Link to="03">
          <li>3. 연습1</li>
        </Link>
        <Link to="04">
          <li>4. 연습2</li>
        </Link>
        <Link to="05">
          <li>5. DynamicStyling</li>
        </Link>
        <Link to="06">
          <li>6. 연습3</li>
        </Link>
      </ul>
      <Outlet />
    </div>
  );
}

export default App;
