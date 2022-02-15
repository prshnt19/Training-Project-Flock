import Contact from "../model/Contact";

export const emptyContact = new Contact();

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ) !== null;
};

export const validateName = (name: string) => {
  return name.match(
    /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  ) !== null;
};

export const validateContactNumber = (contactNumber: string) => {
  return contactNumber.match(
    /^(\d{10,12})$/
  ) !== null;
};

export const validateContact = (contact: Contact): boolean => {
  if (contact.name !== "" && !validateName(contact.name)) {
    // alert("Invalid Name");
    return false;
  }
  if (contact.contact !== "" && !validateContactNumber(contact.contact)) {
    // alert("Invalid Contact Number");
    return false;
  }
  if (contact.email !== "" && !validateEmail(contact.email)) {
    // alert("Invalid Email");
    return false;
  }
  return (contact.name !== "" || contact.contact !== "" || contact.email !== "" || contact.address !== "");
}

export const stringToColor = (str: string) => {
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

export const stringAvatar = (name: string) => {
  const nameArray = name.split(" ");
  let children = "";
  for (let i = 0; i < Math.min(nameArray.length, 2); i++) {
    children += nameArray[i].charAt(0);
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: children,
  };
}

export const compareContactsByName = (a: Contact, b: Contact) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
}

export const compareContactsByScore = (a: Contact, b: Contact) => {
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
}

export const contactsToDisplay = (allContacts: Contact[], searchText: string) => {
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
    contactsToDisplay.sort(compareContactsByScore);
  } else {
    for (let index = 0; index < allContacts.length; index++) {
      contactsToDisplay.push(allContacts[index]);
    }
    contactsToDisplay.sort(compareContactsByName);
  }

  return contactsToDisplay;
}
