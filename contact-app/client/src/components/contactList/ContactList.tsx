import React from "react";
import { ContactCard } from "../contactCard/ContactCard";
import { useAppSelector } from "../../redux/hooks";
import { contactsToDisplay } from "../../utils/Utils";
import "./ContactList.css";

const ContactList = () => {
  const allContacts = useAppSelector((state) => state.contacts.value);
  let searchText = useAppSelector((state) => state.searchText.value);
  let contacts = contactsToDisplay(allContacts, searchText);

  return (
    <div className="contact-list">
      {contacts.map((contact) => {
        return <ContactCard key={contact.id} contact={contact} />; // TODO: alternate shading for contacts
      })}
    </div>
  );
};

export { ContactList };
