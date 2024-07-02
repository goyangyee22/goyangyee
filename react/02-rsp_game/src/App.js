import "./App.css";
import reset from "./assets/ic-reset.svg";

function App() {
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img className="App-reset" src={reset} />
      <div className="App-scores"></div>
      <div className="Box App-box"></div>
      <div></div>
    </div>
  );
}

export default App;
