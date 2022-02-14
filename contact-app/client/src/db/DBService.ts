import Contact from "../model/Contact";
import { AuthService } from "../service/AuthService";
import { ContactService } from "../service/ContactService";
import { db } from "./db";

export class DBService {
  static async getContacts(userId: number) {
    const contacts = await db.contacts
      .where("userId").equals(userId)
      .toArray();
    return contacts;
  }

  static async putContacts(contacts: Contact[]) {
    await db.contacts.bulkPut(contacts);
  }

  static async addContact(contact: Contact) {
    const id = await ContactService.addContact(contact);
    let newContact = { ...contact };
    newContact.id = id;

    let userId: number;
    const val = sessionStorage.getItem("userId");
    if (val) {
      userId = parseInt(val);
    } else {
      userId = await AuthService.checkAuth();
    }
    newContact.userId = userId;
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
