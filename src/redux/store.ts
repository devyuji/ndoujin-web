import { combineReducers, createStore } from "redux";
import {
  CARD_SHOW_REDUCER,
  DATA_REDUCER,
  LOADING_REDUCER,
  USER_INPUT_REDUCER,
} from "./reducer";

const reducers = combineReducers({
  DATA: DATA_REDUCER,
  SHOW: CARD_SHOW_REDUCER,
  LOADING: LOADING_REDUCER,
  USER_INPUT: USER_INPUT_REDUCER,
});

export const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
