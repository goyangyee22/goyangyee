// Action types
const FETCH_ITEMS = "FETCH_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

// Initial State
const initialState = {
  items: [],
  error: null,
};

function reducer(state, action) {
  // state는 dispatch 함수를 호출할 때 명시적으로 건네주지 않아도
  // reducer가 알아서 관리를 하고 있음.
  // dispatch 함수를 호출할 때 넣어주는 객체가 action으로 들어옴.
  switch (action.type) {
    case FETCH_ITEMS:
      return;
    case ADD_ITEM:
      return { items: [...state, items, action.payload], error: null };
    case UPDATE_ITEM:
      return;
    case DELETE_ITEM:
      return;
    default:
      return state;
  }
}

// Actions(실제 reducer가 state를 변경하기 전에 수행해야 할 작업들)
// dispatch = set함수
const fetchItems = async () => {};

const addItem = async (collectionName, addObj, dispatch) => {
  // dispatch 할 변경된 state 값을 만들어야한다.
  const resultData = await addDatas(collectionName, addObj);
  // dispatch 실행 시 reducer 함수로 간다.
  dispatch({ type: ADD_ITEM, payload: resultData });
};

const updateItem = async () => {};

const deleteItem = async () => {};
