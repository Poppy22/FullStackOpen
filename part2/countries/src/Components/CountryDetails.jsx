import CountryWeather from "./CountryWeather";

const CountryDetails = ({ country }) => {
  return (
    <>
      <h3> {country.name} </h3>
      <p> capital: {country.capital} </p>
      <p> population: {country.population} </p>
      <br />
      <b> Languages: </b>
      <ul>
        {country.languages.map((l) => (
          <li key={l.name}> {l.name} </li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} />
      <br />
      <CountryWeather country={country} />
    </>
  );
};

export default CountryDetails;
