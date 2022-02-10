import axios from "axios";
import React, { useEffect, useState } from "react";
import Content from "./Components/Content";
import Filter from "./Components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Countries</h2>

      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />

      <Content
        countries={countries.filter((c) =>
          c.name.toLowerCase().includes(searchFilter.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;
