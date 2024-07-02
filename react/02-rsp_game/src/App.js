import "./App.css";
import "./HandIcon.css";
import HandIcon from "./HandIcon";
import reset from "./assets/ic-reset.svg";
import HandButton from "./HandButton";

function App() {
  const handleButtonClick = () => {
    // 사용자가 클릭한 주먹가위보 가져와야됨
    // 상대의 주먹가위보 랜덤으로 추출
    // 승패 결정 ==> 배점을 곱해서 점수 추출
  };
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
            <HandIcon value="rock" className="Hand-icon" />
          </div>
          <div className="App-versus">VS</div>
          <div className="Hand">
            <HandIcon value="rock" className="Hand-icon" />
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet">
          <span>배점</span>
          <input type="number" min={1} max={9} />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history">
          <h2>승부기록</h2>
          <p>승리, 패배, 무승부</p>
        </div>
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
