import { createSlice } from "@reduxjs/toolkit";

const LOADING_REDUCER = createSlice({
  name: "LOADING",
  initialState: false,
  reducers: {
    START_LOADING: (state) => (state = true),
    STOP_LOADING: (state) => (state = false),
  },
});

export const { START_LOADING, STOP_LOADING } = LOADING_REDUCER.actions;

export default LOADING_REDUCER.reducer;
