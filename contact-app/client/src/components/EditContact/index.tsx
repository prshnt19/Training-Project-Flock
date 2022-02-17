import React from "react";

import BaseContact from "../BaseContact";
import Contact from "../../model/Contact";
import { setMenu } from "../../redux/menu";
import { useAppDispatch } from "../../redux/hooks";
import { updateContact } from "../../redux/contacts";

const EditContact: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const editContactHandler = (contact: Contact) => {
    dispatch(updateContact(contact));
    dispatch(setMenu("ShowContact"));
  };

  return (
    <BaseContact heading_text="Edit Contact" button_text="Update" rootStyle="contact-wrapper-edit" ContactHandler={editContactHandler} />
  )
};

export default EditContact;
