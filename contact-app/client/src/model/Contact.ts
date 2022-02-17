interface Contact {
  id: number;
  userId: number;
  name: string;
  email: string;
  contactNumber: string; // TODO: Check Backend name
  address: string;
  score: number;
}

class Contact implements Contact {
  constructor(id: number = 0, userId: number = 0, name: string = "", email: string = "", contactNumber: string = "", address: string = "", score: number = 0) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.contactNumber = contactNumber;
    this.address = address;
    this.score = score;
  }
}

export default Contact;
