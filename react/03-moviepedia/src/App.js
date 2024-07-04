import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import {
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
} from "./assets/firebase";
import { useEffect, useState } from "react";

const LIMIT = 10;

function AppSortButton({ children, onClick, selected }) {
  let isSelected = "";
  if (selected) {
    isSelected = "selected";
  }
  return (
    <button className={`AppSortButton ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "movie",
      options
    );
    console.log(resultData);
    if (!options.lq) {
      // setItems(resultData)도 미리 적으면 안 됨
      setItems(resultData);
    } else {
      // setItems([...기존배열, ...새로운값])
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    if (!lastQuery) {
      setHasNext(false);
    }
    setLq(lastQuery);
  };

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
    // handleLoad()도 미리 적으면 안 됨
  }, [order]);
  // []안에 items라고 적으면 무한 루프에 빠지기 때문에 적으면 안 됨

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            최신순
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            베스트순
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          {/* {hasNext && (
            <button className="App-load-more-button" onClick={handleMoreClick}>
              더 보기
            </button>
          )} */}
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            더 보기
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
