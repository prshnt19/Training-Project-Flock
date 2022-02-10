import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts";
import menuReducer from "./menu";
import selectedContactReducer from "./selectedContact";
import searchTextReducer from "./searchText";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    contacts: contactsReducer,
    selectedContact: selectedContactReducer,
    searchText: searchTextReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
