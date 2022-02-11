import React from "react";
import { ContactCard } from "../contactCard/ContactCard";
import { useAppSelector } from "../../redux/hooks";

import "./ContactList.css";
import Contact from "../../model/Contact";

const ContactList = () => {
  const allContacts = useAppSelector((state) => state.contacts.value);
  let searchText = useAppSelector((state) => state.searchText.value);
  let contactsToDisplay = [];

  if (searchText !== "") {
    searchText = searchText.toLowerCase();
    for (let index = 0; index < allContacts.length; index++) {
      const contact = allContacts[index];
      if (
        contact.name.substring(0, searchText.length).toLowerCase() ===
        searchText
      ) {
        contactsToDisplay.push(contact);
      }
    }
    contactsToDisplay.sort(function (a: Contact, b: Contact) {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else {
    for (let index = 0; index < allContacts.length; index++) {
      contactsToDisplay.push(allContacts[index]);
    }
    contactsToDisplay.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="contact-list">
      {contactsToDisplay.map((contact) => {
        return <ContactCard key={contact.id} contact={contact} />; // TODO: alternate shading for contacts
      })}
    </div>
  );
};

export { ContactList };
