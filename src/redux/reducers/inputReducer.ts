import { createSlice } from "@reduxjs/toolkit";

const INPUT_REDUCER = createSlice({
  name: "INPUT",
  initialState: "",
  reducers: {
    SET_INPUT: (state, action) => (state = action.payload),
    CLEAR_INPUT: (state) => (state = ""),
  },
});

export const { SET_INPUT, CLEAR_INPUT } = INPUT_REDUCER.actions;
export default INPUT_REDUCER.reducer;
