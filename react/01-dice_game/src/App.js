import "./App.css";
import logo from "./assets/logo.png";

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
        <img src={logo} />
        <h1></h1>
        <div>
          <button>던지기</button>
          <button>처음부터</button>
        </div>
      </div>
      <div>
        <div>
          <h2></h2>
          <img />
          <h2></h2>
          <p></p>
          <h2></h2>
        </div>
        <div>
          <h2></h2>
          <img />
          <h2></h2>
          <p></p>
          <h2></h2>
        </div>
      </div>
    </div>
  );
}

export default App;
