import React from "react";

import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../mainContent/MainContent";
import { addContact } from "../../redux/contacts";
import Contact from "../../model/Contact";
import { useAppDispatch } from "../../redux/hooks";
import { DBService } from "../../db/DBService";

const AddContact = () => {
  const dispatch = useAppDispatch();

  const addContactHandler = async (contact: Contact) => {
    DBService.addContact(contact)
      .then((newContact) => {
        dispatch(setSelectedContact(emptyContact));
        dispatch(addContact(newContact));
        dispatch(setMenu(""));
      });
  };

  return (
    <BaseContact
      heading_text="Add New Contact"
      button_text="Save"
      rootStyle="contact-wrapper-add"
      ContactHandler={addContactHandler}
    />
  );
};

export { AddContact };
