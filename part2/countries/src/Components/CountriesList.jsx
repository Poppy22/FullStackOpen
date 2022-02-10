import React, { useState } from "react";
import CountryDetails from "./CountryDetails";

const CountriesList = ({ countries }) => {
  const [selectedCountry, setCountry] = useState();

  return (
    <>
      {selectedCountry ? (
        <CountryDetails country={countries[selectedCountry]} />
      ) : (
        <ul>
          {countries.map((c, idx) => (
            <li key={c.alpha3Code}>
              {" "}
              {c.name} <button onClick={() => setCountry(idx)}> Show </button>{" "}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CountriesList;
