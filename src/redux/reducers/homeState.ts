import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cardVisible: false,
  error: false,
  isSaved: false,
};

const homeState = createSlice({
  initialState,
  name: "homeState",
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
      return state;
    },
    showCard: (state) => {
      state.cardVisible = true;
      return state;
    },
    toggleError: (state) => {
      state.error = !state.error;
      return state;
    },
    setSaved: (state, action) => {
      state.isSaved = action.payload;
      return state;
    },
  },
});

export default homeState.reducer;
export const { showCard, toggleLoading, toggleError, setSaved } =
  homeState.actions;
