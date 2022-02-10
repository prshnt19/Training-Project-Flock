import {
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  UPDATE_CONTACT,
  GET,
  POST,
  PUT,
  DELETE,
} from "../service/constants";

import { APIManager } from "../api/APIManager";
import Contact from "../model/Contact";

export class ContactService {

  static getContacts() {
    return APIManager.request(GET_CONTACTS, GET, null, true);
  }

  static addContact(contact: Contact) {
    return APIManager.request(ADD_CONTACT, POST, JSON.stringify(contact), true, true).then((res) => {
      return res.id;
    });
  }

  static updateContact(contact: Contact) {
    return APIManager.request(UPDATE_CONTACT, PUT, JSON.stringify(contact), true, true, false);
  }

  static deleteContact(contactId: number) {
    var formData = new FormData();
    formData.append("id", contactId.toString());
    return APIManager.request(DELETE_CONTACT, DELETE, formData, true, false, false);
  }
}
