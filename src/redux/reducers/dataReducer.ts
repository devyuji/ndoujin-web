import { createSlice } from "@reduxjs/toolkit";

export interface dataType {
  id: string;
  errror: boolean;
  image_cover: String;
  title: String;
  tags: Array<String>;
  page: String;
  language: String;
  artist: String;
}

const initialState: dataType = {
  id: "",
  errror: false,
  image_cover: "",
  title: "",
  artist: "",
  language: "",
  page: "",
  tags: [],
};

const DATA_REDUCER = createSlice({
  name: "DATA",
  initialState,
  reducers: {
    SET_DATA: (state, action) => (state = action.payload),
    RESET_DATA: (state) => (state = initialState),
  },
});

export const { SET_DATA, RESET_DATA } = DATA_REDUCER.actions;
export default DATA_REDUCER.reducer;
