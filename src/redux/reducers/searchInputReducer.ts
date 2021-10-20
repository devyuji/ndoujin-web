import { createSlice } from "@reduxjs/toolkit";

const SEARCH_INPUT_REDUCER = createSlice({
  name: "SEARCH_INPUT",
  initialState: "",
  reducers: {
    SET_INPUT: (state, action) => (state = action.payload),
  },
});

export const { SET_INPUT } = SEARCH_INPUT_REDUCER.actions;
export default SEARCH_INPUT_REDUCER.reducer;
