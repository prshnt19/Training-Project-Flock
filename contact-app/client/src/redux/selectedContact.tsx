import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Contact from "../model/Contact";

interface SelecctedContactState { 
  value: Contact;
}

const initialState: SelecctedContactState = {
  value: {
    id: 0,
    name: "",
    contact: "",
    email: "",
    address: "",
    score: 0,
  }
};

export const selectedContactSlice = createSlice({
  name: "selectedContact",
  initialState,
  reducers: {
    setSelectedContact: (state, action: PayloadAction<Contact>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedContact } = selectedContactSlice.actions;
export default selectedContactSlice.reducer;
