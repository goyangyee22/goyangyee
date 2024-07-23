import {
  addDatas,
  deleteDatas,
  getDatasByOrderLimit,
  updateDatas,
} from "../api/firebase";
import "./App.css";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import { useEffect, useState } from "react";
import searchImg from "../assets/ic-search.png";
import backgroundImg from "../assets/background.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";

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
  const [keyword, setKeyword] = useState("");
  // const t = useTranslate();

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "foodit",
      options
    );
    console.log(resultData);
    if (!options.lq) {
      // ※ setItems(resultData)도 미리 적으면 안 됨 ※
    } else {
      // setItems([...기존배열, ...새로운값])
    }
    if (!lastQuery) {
    }
  };

  const handleKeywordChange = (e) => {
    // 사용자가 입력한 키워드를 state에 저장합니다.
    setKeyword(e.target.value);
  };

  // 데이터를 삭제하는 함수입니다.
  const handleDelete = async (docId, imgUrl) => {
    // Firebase에 접근하여 imgUrl을 사용해 스토리지에 있는 사진 파일을 삭제합니다.
    // docId를 사용해 문서를 삭제합니다.
    const result = await deleteDatas("foodit", docId, imgUrl);

    // db에서 삭제가 되면 그 결과를 화면에 반영합니다.
    if (!result) {
      alert("저장된 이미지 파일이 없습니다. \n 관리자에게 문의하세요.");
      return false;
    }

    // items에서 docId가 같은 요소(객체)를 찾아서 제거합니다.
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  useEffect(() => {}, []);

  // 데이터 추가에 성공했을 때의 함수입니다.
  const handleAddSuccess = (data) => {
    setItems((prevItems) => [data, ...prevItems]);
  };

  // 데이터 업데이트에 성공했을 때의 함수입니다.
  const handleUpdateSuccess = (result) => {
    // 화면처리.. 기존데이터를 items에서 삭제, 수정된 데이터는 items의 기존 위치에 추가합니다.
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

  // 최신순 버튼에 대한 함수입니다.
  const handleNewestClick = () => setOrder("createdAt");

  // 칼로리순 버튼에 대한 함수입니다.
  const handleHighestClick = () => setOrder("calorie");

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <nav className="App-nav">
        <img className="App-logo" src={logoImg} />
      </nav>
      <div className="App-container">
        <div className="App-FoodForm">
          <div className="App-FoodFind">
            <FoodForm
              onSubmit={addDatas}
              handleSubmitSuccess={handleAddSuccess}
            />
            <form>
              <input
                value={keyword}
                placeholder="검색으로 음식 찾기"
                onChange={handleKeywordChange}
              ></input>
              <button>
                <img src={searchImg} />
              </button>
            </form>
          </div>
          <div className="App-SortButton">
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
          <div className="App-filter">
            <FoodList
              items={items}
              handleDelete={handleDelete}
              onUpdate={updateDatas}
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        </div>
        <footer className="App-footer">
          <img src={logoTextImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
