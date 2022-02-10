import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
