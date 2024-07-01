import Board from "./Board";
import "./App.css";
import logo from "./assets/logo.png";

function random(n) {
  return Math.ceil(Math.random * n);
}

function App() {
  const [gameHistory, setGameHistory] = useState([]);
  const [otherGameHistory, setOtherGameHistory] = userState([]);
  console.log(gameHistory);
  console.log(otherGameHistory);

  const handleRollClick = () => {
    // 바위 = 1, 가위 = 2, 보 = 3이라고 가정하고 숫자를 뽑습니다.
    const myNum = [];
    const otherNum = random(3);

    // 기록을 추가합니다.
    setGameHistory([...gameHistory, myNum]);
    setOtherGameHistory([...otherGameHistory, otherNum]);
  };

  const handleClearClick = () => {
    setGameHistory([]);
    setOtherGameHistory([]);
  };
  return (
    <div className="App">
      <div>
        <img src={logo} className="App-logo" />
        <h1 className="App-title">가위바위보</h1>
        <button className="App-button yellow" onClick={handleClearClick}>
          초기화
        </button>
      </div>
      <div className="App-boards">
        <Board name="나" gameHistory={gameHistory} />
        <Board name="상대" gameHistroy={otherGameHistory} />
      </div>
      <div className="App-divide">
        배점
        <select className="App-select">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
        </select>
      </div>
      <div className="App-result">
        <Board />
      </div>
      <div>
        <div>
          <img src="../src/assets/rock.svg" />
        </div>
        <div>
          <img src="../src/assets/scissor.svg" />
        </div>
        <div>
          <img src="../src/assets/paper.svg" />
        </div>
      </div>
    </div>
  );
}

export default App;
