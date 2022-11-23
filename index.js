const argv = require('yargs/yargs')(process.argv.slice(2))
  .alias('a', 'action')
  .alias('i', 'id')
  .alias('n', 'name')
  .alias('e', 'email')
  .alias('p', 'phone')
  .describe('a', 'enter the  action type')
  .describe('i', `enter the contact's ID`)
  .describe('n', `enter the contact's name`)
  .describe('e', `enter the contact's email`)
  .describe('p', `enter the contact's phone`)
  .choices('a', ['list', 'get', 'add', 'remove'])
  .help('h', 'help').argv;

const contacts = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts();
      break;

    case 'get':
      contacts
        .getContactById(id)
        .then((data) => console.log(`\x1b[35m ${data}`))
        .catch((err) => console.error(err.message));
      break;

    case 'add':
      contacts.addContact(name, email, phone);
      break;

    case 'remove':
      contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
