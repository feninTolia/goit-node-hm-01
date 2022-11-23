const path = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  try {
    const data = await readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    console.table(
      contacts.map(
        (contact) => `${contact.name} (${contact.email}) - ${contact.phone}`
      )
    );
  } catch (err) {
    console.error('err', err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await readFile(contactsPath, 'utf-8');
    const contactsList = JSON.parse(data);

    const contact = await contactsList.find(
      (contact) => contact.id === contactId.toString()
    );
    return `${contact.name} (${contact.email}) - ${contact.phone}`;
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await readFile(contactsPath, 'utf-8');
    const contactsList = JSON.parse(data);

    const newContactList = contactsList.filter(
      (contact) => contact.id !== contactId.toString()
    );

    const stringifiedNewCOntactsList = JSON.stringify(newContactList, null, 2);

    const promise = await writeFile(
      contactsPath,
      stringifiedNewCOntactsList,
      'utf-8'
    );

    console.table(
      newContactList.map(
        (contact) => `${contact.name} (${contact.email}) - ${contact.phone}`
      )
    );
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await readFile(contactsPath, 'utf-8');
    const contactsList = JSON.parse(data);

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone: phone.toString(),
    };

    contactsList.push(newContact);

    const stringifiedContactsList = JSON.stringify(contactsList, null, 2);

    const promise = await writeFile(
      contactsPath,
      stringifiedContactsList,
      'utf-8'
    );

    console.table(
      contactsList.map(
        (contact) => `${contact.name} (${contact.email}) - ${contact.phone}`
      )
    );
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
