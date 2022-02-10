import axios from "axios";
import React, { useEffect, useState } from "react";

const CountryWeather = ({ country }) => {
  const [weather, setWeather] = useState();
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <>
      {weather ? (
        <>
          <p> Temperature: {weather.main.temp} </p>
          <p> Wind speed: {weather.wind.speed} </p>
        </>
      ) : (
        <p>Weather is loading</p>
      )}
    </>
  );
};

export default CountryWeather;
