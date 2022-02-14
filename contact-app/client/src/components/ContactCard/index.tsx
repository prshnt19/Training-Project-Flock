import React from "react";
import { Avatar, IconButton } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { setMenu } from "../../redux/menu";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../../utils/Utils";
import { updateContact, deleteContact } from "../../redux/contacts";
import Contact from "../../model/Contact";
import { stringAvatar } from "../../utils/Utils";
import "./style.css";

interface ContactProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactProps> = (props) => {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => state.searchText.value);

  const showContactHandler = async () => {
    let updatedScoreContact = props.contact;
    if (searchText.length > 0) {
      updatedScoreContact = { ...updatedScoreContact, score: updatedScoreContact.score + 1 };
      dispatch(updateContact(updatedScoreContact));
    }
    dispatch(setSelectedContact(updatedScoreContact));
    dispatch(setMenu("ShowContact"));
  };
  // TODO: Better move function to ContactList

  const deleteContactHandler = async () => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (confirmDelete) {
      dispatch(deleteContact(props.contact.id));
      dispatch(setMenu(""));
      dispatch(setSelectedContact(emptyContact));
    }
  };

  return (
    <div className="contact-box">
      <div className="contact-avatar" onClick={showContactHandler}>
        <Avatar {...stringAvatar(props.contact.name)} />
      </div>
      <div className="contact-text" onClick={showContactHandler}>
        <div className="contact-name">{props.contact.name}</div>
        <div className="contact-number">{props.contact.contact}</div>
      </div>
      <div className="contact-edit">
        <IconButton
          title="Edit Contact"
          style={{ height: "40px", width: "40px", borderRadius: "100%", color: "orange" }}
          onClick={() => {
            dispatch(setSelectedContact(props.contact));
            dispatch(setMenu("EditContact"));
          }}
        >
          <ModeEditRoundedIcon />
        </IconButton>
      </div>
      <div className="contact-delete">
        <IconButton
          title="Delete Contact"
          onClick={deleteContactHandler}
          style={{ height: "40px", width: "40px", borderRadius: "100%", color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ContactCard;
