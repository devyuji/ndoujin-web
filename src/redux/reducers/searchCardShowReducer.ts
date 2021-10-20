import { createSlice } from "@reduxjs/toolkit";

const SEARCH_CARD_SHOW_VISIBLE = createSlice({
  name: "IS_SEARCH_CARD_SHOW_VISIBLE",
  initialState: false,
  reducers: {
    SHOW_CARD: (state) => (state = true),
    HIDE_CARD: (state) => (state = false),
  },
});

export const { HIDE_CARD, SHOW_CARD } = SEARCH_CARD_SHOW_VISIBLE.actions;
export default SEARCH_CARD_SHOW_VISIBLE.reducer;
