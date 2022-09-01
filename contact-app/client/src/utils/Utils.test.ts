import {
  validateEmail,
  validateName,
  validateContactNumber,
  validateContact,
  stringToColor,
  stringAvatar,
  compareContactsByName,
  compareContactsByScore,
  contactsToDisplay,
} from './Utils';
import Contact from '../model/Contact';

test('validateEmailEmpty', () => {
  expect(validateEmail("")).toBe(false);
});

test('validateEmailExample', () => {
  expect(validateEmail("abc@example.com")).toBe(true);
});

test('validateNameEmpty', () => {
  expect(validateName("")).toBe(false);
});

test('validateNameExample', () => {
  expect(validateName("example")).toBe(true);
});

test('validateContactNumberEmpty', () => {
  expect(validateContactNumber("")).toBe(false);
});

test('validateContactNumberExample', () => {
  expect(validateContactNumber("1234567890")).toBe(true);
});

test('validateContact_EmptyContact', () => {
  let contact = new Contact();
  expect(validateContact(contact)).toBe(false);
});

test('validateContact_Invalid_Name', () => {
  let contact = new Contact();
  contact.name = "123";
  expect(validateContact(contact)).toBe(false);
});

test('validateContact_Invalid_Number', () => {
  let contact = new Contact();
  contact.name = "example";
  contact.contactNumber = "abc";
  expect(validateContact(contact)).toBe(false);
});

test('validateContact_Invalid_Email', () => {
  let contact = new Contact();
  contact.name = "example";
  contact.contactNumber = "0123456789";
  contact.email = "abc";
  expect(validateContact(contact)).toBe(false);
});

test('validateContact_Valid', () => {
  let contact = new Contact();
  contact.name = "example";
  contact.contactNumber = "0123456789";
  contact.email = "abc@example.com";
  expect(validateContact(contact)).toBe(true);
});

test('stringToColor', () => {
  expect(stringToColor("TEST")).toBe("#923c27");
});

test('stringAvatar', () => {
  expect(stringAvatar("TEST")).toEqual({
    sx: {
      bgcolor: "#923c27",
    },
    children: "T",
  });
});

test('compareContactsByName1', () => {
  let a = new Contact();
  a.name = "a";
  let b = new Contact();
  b.name = "b";
  expect(compareContactsByName(a, b)).toBe(-1);
});

test('compareContactsByName2', () => {
  let a = new Contact();
  a.name = "a";
  let b = new Contact();
  b.name = "b";
  expect(compareContactsByName(b, a)).toBe(1);
});

test('compareContactsByName3', () => {
  let a = new Contact();
  a.name = "a";
  let b = new Contact();
  b.name = "a";
  expect(compareContactsByName(a, b)).toBe(0);
});

test('compareContactsByScore1', () => {
  let a = new Contact();
  a.score = 1;
  let b = new Contact();
  expect(compareContactsByScore(a, b)).toBe(-1);
});

test('compareContactsByScore2', () => {
  let a = new Contact();
  let b = new Contact();
  b.score = 1;
  expect(compareContactsByScore(a, b)).toBe(1);
});

test('compareContactsByScore3', () => {
  let a = new Contact();
  a.name = "a";
  let b = new Contact();
  b.name = "b";
  expect(compareContactsByScore(a, b)).toBe(-1);
});

test('contactsToDisplay1', () => {
  let allContacts = Array<Contact>(1);
  let searchText = "";
  expect(contactsToDisplay(allContacts, searchText)).toEqual(allContacts);
});

test('contactsToDisplay2', () => {
  let allContacts = Array<Contact>(1);
  allContacts[0] = new Contact();
  allContacts[0].name = "abc";
  let searchText = "abc";
  expect(contactsToDisplay(allContacts, searchText)).toEqual(allContacts);
});

test('contactsToDisplay3', () => {
  let allContacts = Array<Contact>();
  let searchText = "";
  expect(contactsToDisplay(allContacts, searchText)).toEqual([]);
});
