import "./App.css";
import logo from "./assets/logo.png";
import blueOne from "./assets/dice-blue-1.svg";
import redOne from "./assets/dice-red-1.svg";
import Board from "./Board";

// 함수형 컴포넌트 : 컴포넌트를 함수형으로 만든것(변수형으로도 만들 수 있다.)
// 함수형 컴포넌트를 만들 때에는 함수명의 첫 글자는 반드시 대문자여야 한다.
// 함수형 컴포넌트 안에서는 JSX 문법으로 만든 리엑트 엘리먼트를 리턴해줘야 한다.

const style = {
  backgroundColor: "#d9d9d9",
  color: "yellow",
};

// for ==> htmlFor, onclick/onblur ==> onClick/onBlur
function App() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="App-logo" />
        <h1 className="App-title">주사위게임</h1>
        <div>
          <button className="App-button blue">던지기</button>
          <button className="App-button red">처음부터</button>
        </div>
      </div>
      <div className="App-boards">
        <Board />
        <Board />
      </div>
    </div>
  );
}

export default App;
