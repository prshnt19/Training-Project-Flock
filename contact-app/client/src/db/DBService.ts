import Contact from "../model/Contact";
import { AuthService } from "../service/AuthService";
import { ContactService } from "../service/ContactService";
import { db } from "./db";

export class DBService {
  static async getContacts(userId: number) {
    // const contacts = await ContactService.getContacts();
    // await db.contacts.bulkPut(contacts);
    const contacts = await db.contacts
      .where("userId").equals(userId)
      .toArray();
    // TODO: Make user specific query
    return contacts;
  }

  static async addContact(contact: Contact) {
    const id = await ContactService.addContact(contact);
    let newContact = { ...contact };
    newContact.id = id;
    newContact.userId = await AuthService.checkAuth();
    // TODO: Make it better
    db.contacts.add(newContact);
    return newContact;
  }

  static async updateContact(contact: Contact) {
    db.contacts.put(contact);
    ContactService.updateContact(contact);
  }

  static async deleteContact(contactId: number) {
    db.contacts.delete(contactId);
    ContactService.deleteContact(contactId);
  }
}
