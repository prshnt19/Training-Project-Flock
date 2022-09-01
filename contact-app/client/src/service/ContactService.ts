import {
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  UPDATE_CONTACT,
  GET,
  POST,
  PUT,
  DELETE,
} from "../utils/APIConstants";

import { APIManager } from "../api/APIManager";
import Contact from "../model/Contact";

export default class ContactService {

  static async getContacts(): Promise<Contact[]> {
    return APIManager.request(GET_CONTACTS, GET, null, true);
  }

  static async addContact(contact: Contact): Promise<number> {
    const res = await APIManager.request(ADD_CONTACT, POST, JSON.stringify(contact), true, true);
    return res.id;
  }

  static async updateContact(contact: Contact): Promise<void> {
    APIManager.request(UPDATE_CONTACT, PUT, JSON.stringify(contact), true, true, false);
  }

  static async deleteContact(contactId: number): Promise<void> {
    var formData = new FormData();
    formData.append("id", contactId.toString());
    APIManager.request(DELETE_CONTACT, DELETE, formData, true, false, false);
  }
}
