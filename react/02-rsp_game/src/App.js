import "./App.css";
import logo from "./assets/logo.png";

function random(n) {
  return Math.ceil(Math.random * n);
}

function App() {
  const [gameHistory, setGameHistory] = useState([]);
  console.log(gameHistory);
  console.log(setGameHistory);
  const handleRollClick = () => {
    // 바위 = 1, 가위 = 2, 보 = 3이라고 가정하고 숫자를 뽑습니다.
    const myNum = [];
    const otherNum = random(3);

    // 기록을 추가합니다.
    setGameHistory([...gameHistory, myNum]);
  };

  const handleClearClick = () => {
    setGameHistory([]);
  };
  return (
    <div className="App">
      <div>
        <img src={logo} className="App-logo" />
        <h1 className="App-title">가위바위보</h1>
        <button
          className="App-button yellow"
          onClick={handleClearClick}
        ></button>
      </div>
    </div>
  );
}

export default App;
