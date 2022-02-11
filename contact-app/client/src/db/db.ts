import Dexie, { Table } from 'dexie';
import Contact from '../model/Contact';

export class MySubClassedDexie extends Dexie {
  contacts!: Table<Contact>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      contacts: '++id, userId, name, contact, email, address',
    });
  }
}

export const db = new MySubClassedDexie();
