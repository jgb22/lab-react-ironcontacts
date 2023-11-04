import React, { useState } from 'react';
import './App.css';
import contactsData from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  const [remainingContacts, setRemainingContacts] =  useState(contactsData.slice(5)); //Remaining contacts and their state


  const addRandomContact = () => {
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts[randomIndex];

      const updatedContacts = [...contacts, randomContact];
      setContacts(updatedContacts);

      const updatedRemainingContacts = remainingContacts.filter((contact, index) => index !== randomIndex);
      // Update remaining contacts after adding a new one
      setRemainingContacts(updatedRemainingContacts);
    }
  };

  const sortByName = () => {
    const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sortedContacts);
  };

  const renderAwardsInfo = (contact) => {
    if (contact.wonOscar && contact.wonEmmy) {
      return (
        <td>
          <span role="img" aria-label="Trophy">
            🏆🏆
          </span>
        </td>
      );
    } else if (contact.wonOscar) {
      return (
        <td>
          <span role="img" aria-label="Trophy">
            🏆
          </span>
        </td>
      );
    } else if (contact.wonEmmy) {
      return (
        <td>
          <span role="img" aria-label="Trophy">
            🏆
          </span>
        </td>
      );
    } else {
      return <td></td>;
    }
  };


  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <div className="App">
      <h1>Top 5 Contacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} style={{ width: '50px', height: 'auto' }} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              {renderAwardsInfo(contact)}
              <td>
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
