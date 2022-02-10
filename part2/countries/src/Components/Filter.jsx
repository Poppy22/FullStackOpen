const Filter = ({ searchFilter, setSearchFilter }) => {
  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  return (
    <>
      <h4> Filter users </h4>
      <div>
        filter by name:{" "}
        <input value={searchFilter} onChange={handleSearchFilterChange} />
      </div>
    </>
  );
};

export default Filter;
