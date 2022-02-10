import React from "react";

import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useAppDispatch } from "../../redux/hooks";
import { updateContact } from "../../redux/contacts";
import { ContactService } from "../../service/ContactService";
import Contact from "../../model/Contact";

const EditContact = () => {
  const dispatch = useAppDispatch();

  const editContactHandler = (contact: Contact) => {
    ContactService.updateContact(contact);
    dispatch(updateContact(contact));
    dispatch(setMenu("showContact"));
  };
  return (
    <BaseContact heading_text="Edit Contact" button_text="Update" rootStyle="contact-wrapper-edit" ContactHandler={editContactHandler}/>
  )
};

export { EditContact };