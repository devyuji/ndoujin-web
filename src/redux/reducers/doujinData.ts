import { createSlice } from "@reduxjs/toolkit";
import { doujinProps } from "../../lib/types";

const initialState: doujinProps = {
  artist: "",
  error: false,
  id: "",
  image_cover: "",
  language: "",
  page: "",
  tags: [],
  title: " ",
};

const doujinData = createSlice({
  initialState,
  name: "doujin",
  reducers: {
    add: (state, action) => (state = action.payload),
  },
});

export default doujinData.reducer;
export const { add } = doujinData.actions;
