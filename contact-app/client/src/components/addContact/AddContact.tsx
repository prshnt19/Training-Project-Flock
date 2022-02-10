import React from "react";

import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../mainContent/MainContent";
import { addContact } from "../../redux/contacts";
import { ContactService } from "../../service/ContactService";
import Contact from "../../model/Contact";
import { useAppDispatch } from "../../redux/hooks";

const AddContact = () => {
  const dispatch = useAppDispatch();

  const addContactHandler = (contact: Contact) => {
    ContactService.addContact(contact).then((res) => {
      contact.id = res;
      dispatch(setSelectedContact(emptyContact));
      dispatch(addContact(contact));
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
