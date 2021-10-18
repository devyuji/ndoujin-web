import { createSlice } from "@reduxjs/toolkit";

const SELECTED_PAGE_REDUCER = createSlice({
  name: "SELECTED_PAGE",
  initialState: 1,
  reducers: {
    CHANGE_PAGE: (state, action) => (state = action.payload),
  },
});

export const { CHANGE_PAGE } = SELECTED_PAGE_REDUCER.actions;
export default SELECTED_PAGE_REDUCER.reducer;
