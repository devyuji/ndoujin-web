import { configureStore } from "@reduxjs/toolkit";
import doujinData from "./reducers/doujinData";
import homeState from "./reducers/homeState";

export const store = configureStore({
  reducer: {
    doujinData,
    homeState,
  },
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
