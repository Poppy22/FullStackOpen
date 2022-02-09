import React, { useState } from "react";
import PersonList from "./Components/PersonList";
import Filter from "./Components/Filter";
import ContactForm from "./Components/ContactForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const found = persons.find((p) => {
      return p.name === newName;
    });

    if (found) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const noteObject = {
      name: newName,
      number: newPhoneNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(noteObject));
    setNewName("");
    setNewPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />

      <ContactForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={setNewPhoneNumber}
      />

      <PersonList persons={persons} searchFilter={searchFilter} />
    </div>
  );
};

export default App;
