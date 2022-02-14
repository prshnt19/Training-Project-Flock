import React from "react";
import BaseContact from "../BaseContact";
import { setMenu } from "../../redux/menu";
import { useAppDispatch } from "../../redux/hooks";
import { updateContact } from "../../redux/contacts";
import Contact from "../../model/Contact";

const EditContact = () => {
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
