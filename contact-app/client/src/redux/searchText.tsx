import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchTextSlice = createSlice({
  name: "searchText",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchText } = searchTextSlice.actions;
export default searchTextSlice.reducer;
