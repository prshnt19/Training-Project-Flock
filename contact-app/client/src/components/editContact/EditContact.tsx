import React from "react";

import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useAppDispatch } from "../../redux/hooks";
import { updateContact } from "../../redux/contacts";
import Contact from "../../model/Contact";
import { DBService } from "../../db/DBService";

const EditContact = () => {
  const dispatch = useAppDispatch();

  const editContactHandler = async (contact: Contact) => {
    DBService.updateContact(contact)
      .then(() => {
        dispatch(updateContact(contact));
        dispatch(setMenu("ShowContact"));
      });
  };

  return (
    <BaseContact heading_text="Edit Contact" button_text="Update" rootStyle="contact-wrapper-edit" ContactHandler={editContactHandler} />
  )
};

export { EditContact };