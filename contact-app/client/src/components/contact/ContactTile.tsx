import { Avatar, IconButton } from "@mui/material";
import React from "react";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { setMenu } from "../../redux/menu";
import { useAppDispatch } from "../../redux/hooks";

import "./Contact.css";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../mainContent/MainContent";
import { updateContact, deleteStoreContact } from "../../redux/contacts";
import { ContactService } from "../../service/ContactService";
import Contact from "../../model/Contact";

interface ContactProps {
  contact: Contact;
}

const ContactTile: React.FC<ContactProps> = (props) => {
  const dispatch = useAppDispatch();

  const showContact = () => {
    const score = "score";
    let updatedScoreContact = {
      ...props.contact,
      [score]: props.contact.score + 1,
    };
    dispatch(setSelectedContact(updatedScoreContact));
    ContactService.updateContact(updatedScoreContact);
    dispatch(updateContact(updatedScoreContact));
    dispatch(setMenu("ShowContact"));
  };

  const deleteContact = () => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (confirmDelete) {
      ContactService.deleteContact(props.contact.id);
      dispatch(deleteStoreContact(props.contact.id));
      dispatch(setMenu(""));
      dispatch(setSelectedContact(emptyContact));
    }
  };

  return (
    <div className="contact-box">
      <div className="contact-avatar" onClick={showContact}>
        <Avatar {...stringAvatar(props.contact.name)} />
      </div>
      <div className="contact-text" onClick={showContact}>
        <div className="contact-name">{props.contact.name}</div>
        {/* <div className="contact-number">{props.contact.contact}</div> */}
      </div>
      <div className="contact-edit">
        <IconButton
          title="Edit Contact"
          style={{ height: "40px", width: "40px", borderRadius: "100%" }}
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
          onClick={deleteContact}
          style={{ height: "40px", width: "40px", borderRadius: "100%" }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export { ContactTile };

function stringToColor(str: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`, // TODO: This will only print one letter. What if empty name?
  };
}
