import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Contact from "../model/Contact";

interface ContactsState {
  value: Contact[];
}

const initialState: ContactsState = { 
  value: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.value = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.value.push(action.payload);
    },
    deleteStoreContact: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((contact) => contact.id !== action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      state.value = state.value.filter((contact) => contact.id !== action.payload.id);
      state.value.push(action.payload);
    },
  },
});

export const { setContacts, addContact, deleteStoreContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
