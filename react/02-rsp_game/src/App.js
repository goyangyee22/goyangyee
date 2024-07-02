import "./App.css";
import "./HandIcon.css";
import HandIcon from "./HandIcon";
import reset from "./assets/ic-reset.svg";

function App() {
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img className="App-reset" src={reset} />
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">0</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">0</div>
          <div className="Score-name">상대</div>
        </div>
      </div>
      <div className="Box App-box">
        {/* 가위바위보 내는 곳 */}
        <div className="App-hands">
          <div className="Hand">
            <HandIcon className="Hand-icon" />
          </div>
          <div className="App-versus">VS</div>
          <div className="Hand">
            <HandIcon className="Hand-icon" />
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet">
          <span>배점</span>
          <input type="number" min={1} max={9} />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history"></div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
