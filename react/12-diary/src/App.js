import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import { createContext, useEffect, useReducer } from "react";
import {
  addItem,
  deleteItem,
  fetchItems,
  initialState,
  reducer,
  updateItem,
} from "./api/itemReducer";
import DiaryPage from "./pages/DiaryPage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import { getUserAuth } from "./api/firebase";
import { userInitialState, userReducer } from "./api/userReducer";

// 컨텍스트 생성
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userState, loginDispatch] = useReducer(userReducer, userInitialState);
  const auth = getUserAuth();

  // CREATE
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: "4447447@naver.com",
    };
    await addItem("diary", addObj, dispatch);
  };

  // READ
  // UPDATE
  const onUpdate = async (values) => {
    const updateObj = {
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
    };
    await updateItem("diary", values.docId, updateObj, dispatch);
  };

  // DELETE
  const onDelete = async (docId) => {
    await deleteItem("diary", docId, dispatch);
  };

  useEffect(() => {
    fetchItems(
      "diary",
      {
        conditions: [
          { field: "userEmail", operator: "==", value: "4447447@naver.com" },
        ],
        orderBys: [{ field: "date", direction: "desc" }],
      },
      dispatch
    );
  }, []);
  return (
    // 컨텍스트 범위 설정
    <DiaryStateContext.Provider
      value={{ diaryList: state.items, auth: userState }}
    >
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <BrowserRouter>
          <div className="App">
            {/* <Button text={"로그인"} className="btn_login" onClick={goLogin} /> */}
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="new" element={<NewPage />} />
                <Route path="edit/:id" element={<EditPage />} />
                <Route path="diary/:id" element={<DiaryPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
