import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  isVisible: boolean;
  artistName: string;
  page: number;
  data: Array<Object>;
}

const initialState: initialStateProps = {
  isVisible: false,
  artistName: "",
  page: 1,
  data: [],
};

const SEARCH_DATA_REDUCER = createSlice({
  name: "SEARCH_DATA",
  initialState,
  reducers: {
    SET_DATA: (state, action) => {
      state.data = action.payload.data;
      state.artistName = action.payload.artistName;
      state.page = action.payload.page;
      state.isVisible = true;
      return state;
    },
  },
});

export const { SET_DATA } = SEARCH_DATA_REDUCER.actions;
export default SEARCH_DATA_REDUCER.reducer;
