import { createSlice } from "@reduxjs/toolkit";

const APP_STATUS = createSlice({
  name: "APP_STATUS",
  initialState: "loading...",
  reducers: {
    GOOD: (state) => (state = "Good"),
    BAD: (state) => (state = "Bad"),
  },
});

export const { BAD, GOOD } = APP_STATUS.actions;
export default APP_STATUS.reducer;
