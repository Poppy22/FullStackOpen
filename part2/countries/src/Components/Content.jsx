import CountryDetails from "./CountryDetails";
import CountriesList from "./CountriesList";

const Content = ({ countries }) => {
  return (
    <>
      {countries.length === 1 ? (
        <CountryDetails country={countries[0]} />
      ) : countries.length > 10 ? (
        <p> Too many matches, specify another filter. </p>
      ) : (
        <CountriesList countries={countries} />
      )}
    </>
  );
};

export default Content;
