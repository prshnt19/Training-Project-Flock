package com.example.contacts.service;

import com.example.contacts.model.Contact;
import com.example.contacts.model.SessionData;
import com.example.contacts.repository.AuthDB;
import com.example.contacts.repository.ContactsDB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ContactsService {

  @Autowired
  AuthDB authDB;

  @Autowired
  ContactsDB contactsDB;


  public List<Contact> getContacts(String sessionToken) {
    SessionData s = authDB.checkAuth(sessionToken);
    return contactsDB.getContacts(s.getUserId());
  }

  public Contact addContact(String sessionToken, Contact contact) {
    SessionData s = authDB.checkAuth(sessionToken);
    contact.setUserId(s.getUserId());
    return contactsDB.addContact(contact);
  }

  public void deleteContact(String sessionToken, Integer contactId) {
    SessionData s = authDB.checkAuth(sessionToken);
    contactsDB.deleteContact(s.getUserId(), contactId);
  }

  public void updateContact( String sessionToken, Contact contact) {
    SessionData s = authDB.checkAuth(sessionToken);
    contact.setUserId(s.getUserId());
    contactsDB.updateContact(contact);
  }
}
