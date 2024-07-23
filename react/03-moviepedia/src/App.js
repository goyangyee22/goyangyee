import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import {
  addDatas,
  deleteDatas,
  getDatasByOrderLimit,
  updateDatas,
} from "./assets/firebase";
import { useEffect, useState } from "react";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "./hooks/useTranslate";

// 처음에 표시되는 데이터의 수 및 '더 보기' 버튼을 눌렀을 경우 추가로 표시되는 데이터의 수입니다.
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
  const t = useTranslate();

  // db에 접근하는 함수
  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "movie",
      options
    );
    console.log(resultData);
    if (!options.lq) {
      // ※ setItems(resultData)도 미리 적으면 안 됨 ※
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

  // 최신순 버튼에 대한 함수입니다.
  const handleNewestClick = () => setOrder("createdAt");

  // 베스트순 버튼에 대한 함수입니다.
  const handleBestClick = () => setOrder("rating");

  // 더 보기 버튼에 대한 함수입니다.
  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  // 데이터 추가를 성공했을 때
  const handleAddSuccess = (data) => {
    setItems((prevItems) => [data, ...prevItems]);
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

  // 데이터 삭제할 때
  const handleDelete = async (docId, imgUrl) => {
    // 1. Firebase에 접근해서 imgUrl을 사용해 스토리지에 있는 사진파일 삭제

    // 2. docId를 사용해 문서 삭제
    const result = await deleteDatas("movie", docId, imgUrl);

    // db에서 삭제를 성공했을 때만 그 결과를 화면에 반영한다.
    if (!result) {
      alert("저장된 이미지 파일이 없습니다. \n 관리자에게 문의하세요.");
      return false;
    }

    // 3. items에서 docId가 같은 요소(객체)를 찾아서 제거
    // setItems((prevItems) => {
    //   const filteredArr = prevItems.filiter((item) => {
    //     return item.docId !== docId;
    //   });
    //   return filteredArr;
    // });
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
    // ※ handleLoad()도 미리 적으면 안 됨 ※
  }, [order]);
  // ※ []안에 items라고 적으면 무한 루프에 빠지기 때문에 적으면 안 됨 ※

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} />
          <LocaleSelect />
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm
            onSubmit={addDatas}
            handleSubmitSuccess={handleAddSuccess}
          />
        </div>
        <div className="App-sorts">
          <AppSortButton
            selected={order === "createdAt"}
            onClick={handleNewestClick}
          >
            {t("newest")}
          </AppSortButton>
          <AppSortButton
            selected={order === "rating"}
            onClick={handleBestClick}
          >
            {t("best")}
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList
            items={items}
            handleDelete={handleDelete}
            onUpdate={updateDatas}
            onUpdateSuccess={handleUpdateSuccess}
          />
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
            {t("load more")}
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">
          {t("terms of service")} | {t("privacy policy")}
        </div>
      </footer>
    </div>
  );
}

export default App;
