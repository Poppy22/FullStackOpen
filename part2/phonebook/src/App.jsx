import React, { useEffect, useState } from "react";
import PersonList from "./Components/PersonList";
import Filter from "./Components/Filter";
import ContactForm from "./Components/ContactForm";
import phonebookService from "./services/phonebookService";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [notification, setNotification] = useState();

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const notify = (message, type = "success", timeout = 5) => {
    if (notification && notification.timeoutId !== undefined) {
      clearTimeout(notification.timeoutId);
    }

    const timeoutId = setTimeout(() => {
      setNotification(null);
    }, timeout * 1000);
    setNotification({ message, type, timeoutId });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const found = persons.find((p) => {
      return p.name === newName;
    });

    if (found) {
      console.log(found);
      const updatedContact = { ...found, number: newPhoneNumber };
      const id = found.id;

      phonebookService
        .update(id, updatedContact)
        .then((response) => {
          setPersons(persons.map((p) => (p.id !== id ? p : response.data)));
          notify(`Updated phone number for ${updatedContact.name}`);
        })
        .catch((err) => {
          console.error(err.response.data)
          notify(err.response.data.error, 'error')
        });
    } else {
      const phoneBookEntry = {
        name: newName,
        number: newPhoneNumber,
      };

      phonebookService
        .create(phoneBookEntry)
        .then((res) => {
          setPersons(persons.concat(res.data))
          setNewName('')
          setNewPhoneNumber('')
          notify(`Added new contact ${phoneBookEntry.name}`)
        })
        .catch((err) => {
          console.error(err.response.data)
          notify(err.response.data.error, 'error')
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...notification} />

      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />

      <ContactForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={setNewPhoneNumber}
      />

      <PersonList
        persons={persons}
        searchFilter={searchFilter}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
