const ContactForm = ({
  newName,
  setNewName,
  newPhoneNumber,
  setNewPhoneNumber,
  addPerson,
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  return (
    <>
      <h4> Add a new contact </h4>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number:{" "}
          <input value={newPhoneNumber} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
