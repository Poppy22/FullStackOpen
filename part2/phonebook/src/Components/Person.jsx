import phonebookService from "../services/phonebookService";

const Person = ({ person, setPersons }) => {
  const deleteContact = (person) => async (event) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      await phonebookService.remove(person.id);
      setPersons((await phonebookService.getAll()).data);
    }
  };

  return (
    <>
      <li key={person.id}>
        {person.name} ({person.number}){" "}
        <button onClick={deleteContact(person)}> Delete </button>
      </li>
    </>
  );
};

export default Person;
