import React, { Component } from 'react';
import Contact from './Contact';

class Contacts extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        phone: '555-555-5555'
      },
      {
        id: 2,
        name: 'Kate Ann',
        email: 'kate@gmail.com',
        phone: '222-222-2222'
      },
      {
        id: 3,
        name: 'Henry Hod',
        email: 'henry@gmail.com',
        phone: '111-111-1111'
      }
    ]
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    this.setState({
      contacts: filteredContacts
    });
  };

  render() {
    const { contacts } = this.state;
    return (
      <React.Fragment>
        {contacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            deleteClickHandler={this.deleteContact.bind(this, contact.id)}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Contacts;