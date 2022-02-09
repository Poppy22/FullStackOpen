import axios from "axios";
import React, { useEffect, useState } from "react";
import PersonList from "./Components/PersonList";
import Filter from "./Components/Filter";
import ContactForm from "./Components/ContactForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

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
