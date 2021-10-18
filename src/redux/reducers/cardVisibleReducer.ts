import { createSlice } from "@reduxjs/toolkit";

const CARD_VISIBLE_REDUCER = createSlice({
  name: "IS_CARD_VISIBLE",
  initialState: false,
  reducers: {
    SHOW_CARD: (state) => (state = true),
    HIDE_CARD: (state) => (state = false),
  },
});

export const { HIDE_CARD, SHOW_CARD } = CARD_VISIBLE_REDUCER.actions;
export default CARD_VISIBLE_REDUCER.reducer;
