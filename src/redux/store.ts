import { configureStore } from "@reduxjs/toolkit";

// reducers
import DATA_REDUCER from "./reducers/dataReducer";
import INPUT_REDUCER from "./reducers/inputReducer";
import LOADING_REDUCER from "./reducers/loadingReducer";
import CARD_VISIBLE_REDUCER from "./reducers/cardVisibleReducer";
import SELECTED_PAGE_REDUCER from "./reducers/selectedPageReducer";
import SEARCH_DATA_REDUCER from "./reducers/searchDataReducer";
import SEARCH_INPUT_REDUCER from "./reducers/searchInputReducer";
import FILTER_DATA_REDUCER from "./reducers/filterDataReducer";
import APP_STATUS_REDUCER from "./reducers/appStatusReducer";

const store = configureStore({
  reducer: {
    DATA: DATA_REDUCER,
    INPUT: INPUT_REDUCER,
    LOADING: LOADING_REDUCER,
    IS_CARD_VISIBLE: CARD_VISIBLE_REDUCER,
    SELECTED_PAGE: SELECTED_PAGE_REDUCER,
    SEARCH_DATA: SEARCH_DATA_REDUCER,
    SEARCH_INPUT: SEARCH_INPUT_REDUCER,
    FILTER_DATA: FILTER_DATA_REDUCER,
    APP_STATUS: APP_STATUS_REDUCER,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
