import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  const [city, setCity] = useState(" ");
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState({});

  function showWeather(response) {
    setLoad(true);
    setMessage({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dd4d68aa948c5b775af8d0b5d939e242&units=metric`;
    axios.get(url).then(showWeather);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="Search" placeholder="Type a city" onChange={changeCity} />
      <input type="Submit" value="Search" />
    </form>
  );

  if (load) {
    return (
      <div>
        {" "}
        {form}
        <ul>
          <li>Temperature: {Math.round(message.temperature)}°C</li>
          <li>Description: {message.description}</li>
          <li>Humidity: {message.humidity}%</li>
          <li>Wind: {message.wind}km/h</li>
          <li>
            <img scr={message.icon} alt={message.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
