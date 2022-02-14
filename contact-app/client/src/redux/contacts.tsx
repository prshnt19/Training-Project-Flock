import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Contact from "../model/Contact";
import { DBService } from "../db/DBService";

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
    deleteContact: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((contact) => contact.id !== action.payload);
      DBService.deleteContact(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      state.value = state.value.filter((contact) => contact.id !== action.payload.id);
      state.value.push(action.payload);
      DBService.updateContact(action.payload);
    },
  },
});

export const { setContacts, addContact, deleteContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
