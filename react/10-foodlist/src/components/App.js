import "./App.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import searchImg from "../assets/ic-search.png";
import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import {
  addDatas,
  deleteDatas,
  getDatasOrderByLimit,
  updateDatas,
} from "../api/firebase";

let listItems;
const LIMITS = 5;

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [searchedItems, setSearchedItems] = useState([]);
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);
  const [keyword, setKeyword] = useState("");

  // db에 접근합니다.
  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasOrderByLimit(
      "foodit",
      options
    );
    listItems = resultData;
    if (!options.lq) {
      setItems(listItems);
    } else {
      setItems((prevItems) => [resultData, ...prevItems]);
    }
    setLq(lastQuery);
    if (!lastQuery) {
      setHasNext(false);
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = () => {
    if (keyword.trim() === "") {
      // 키워드가 비어있는 경우, 모든 항목을 보여줍니다.
      setSearchedItems(items);
    } else {
      // 키워드가 있는 경우, 해당 키워드를 포함하는 항목들을 필터링하여 보여줍니다.
      const filteredItems = items.filter(({ title }) =>
        title.includes(keyword)
      );
      setSearchedItems(filteredItems);
    }
  };

  // 최신순 버튼에 대한 함수입니다.
  const handleNewestClick = () => setOrder("createdAt");

  // 칼로리순 버튼에 대한 함수입니다.
  const handleHighestClick = () => setOrder("calorie");

  // 더 보기 버튼에 대한 함수입니다.
  const handleLoadMore = async () => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: lq });
  };

  // 데이터 삭제할 때
  const handleDelete = async (docId, imgUrl) => {
    // items에서 docId를 받아온다.
    // db에서 데이터 삭제(스토리지에 있는 사진파일 삭제, db에 있는 데이터 삭제)
    // 삭제 성공시 화면에 결과 반영
    const { result, message } = await deleteDatas("foodit", docId, imgUrl);
    if (!result) {
      alert(message);
      return;
    }
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  // 데이터 추가를 성공했을 때
  const handleAddSuccess = (resultData) => {
    setItems((prevItems) => [...prevItems, resultData]);
  };

  // 데이터 업데이트를 성공했을 때
  const handleUpdateSuccess = (result) => {
    // 화면처리.. 기존데이터는 items에서 삭제, 수정된 데이터는 items의 기존 위치에 추가
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === result.id);

      // 수정된 값의 앞 + 수정된 값 + 수정된 값의 뒤
      return [
        ...prevItems.slice(0, splitIdx),
        result,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  // 처음 렌더링될 때
  useEffect(() => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: undefined });
    setHasNext(true);
  }, [order]);

  // 검색어 변경 시 검색 실행
  useEffect(() => {
    handleSubmit();
  }, [keyword]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm onSubmit={addDatas} onSubmitSuccess={handleAddSuccess} />
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleSubmit}>
            <input
              className="App-search-input"
              value={keyword}
              placeholder="검색으로 음식 찾기"
              onChange={handleKeywordChange}
            />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order === "createdAt"}
              onClick={handleNewestClick}
            >
              최신순
            </AppSortButton>
            <AppSortButton
              selected={order === "calorie"}
              onClick={handleHighestClick}
            >
              칼로리순
            </AppSortButton>
          </div>
        </div>
        <FoodList
          items={searchedItems.length > 0 ? searchedItems : items}
          onDelete={handleDelete}
          onUpdate={updateDatas}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button className="App-load-more-button" onClick={handleLoadMore}>
            더 보기
          </button>
        )}
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;