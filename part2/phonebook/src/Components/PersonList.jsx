import Person from "./Person";

const PersonList = ({ persons, searchFilter }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((p) =>
            p.name.toLowerCase().includes(searchFilter.toLowerCase())
          )
          .map((p) => (
            <Person key={p.id} person={p} />
          ))}
      </ul>
    </>
  );
};

export default PersonList;
