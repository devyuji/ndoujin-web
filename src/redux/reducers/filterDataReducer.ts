import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  language: string;
  data: Array<Object>;
}

const initialState: initialStateProps = {
  language: "all",
  data: [],
};

const FILTER_DATA_REDUCER = createSlice({
  name: "FILTER_DATA",
  initialState,
  reducers: {
    SET_FILTER_DATA: (state, action) => {
      state.data = action.payload.data;
      state.language = action.payload.lang;
      return state;
    },
  },
});

export const { SET_FILTER_DATA } = FILTER_DATA_REDUCER.actions;
export default FILTER_DATA_REDUCER.reducer;
