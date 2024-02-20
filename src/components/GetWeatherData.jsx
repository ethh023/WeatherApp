import React, { useState, useEffect } from "react";
import { DisplayWeatherData } from "./DisplayWeatherData";
import "../styling/WeatherData.css";

export const GetWeatherData = () => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_API_KEY);
  const [location, setLocation] = useState("");
  const [currentWeatherData, setCurrentWeatherData] = useState("");
  const [forecastedWeatherData, setForecastedWeatherData] = useState("");
  const [typingTimeout, setTypingTimeout] = useState("");
  const [message, setMessage] = useState("");

  //---------------------
  //code & isDay
  const [code, setCode] = useState("");
  const [isDay, setIsDay] = useState("");

  useEffect(() => {
    if (currentWeatherData) {
      setCode(currentWeatherData.current.condition.code);
      setIsDay(currentWeatherData.current.is_day);
    }
  }, [currentWeatherData]);

  useEffect(() => {
    const determineBackgroundClass = () => {
      if (code === 1000 && isDay === 1) {
        //clear sunny day
        return "sunny-bg-img";
      } else if (code === 1000 && isDay === 0) {
        //clear night
        return "clear-night-bg-img";
      } else if (code === 1003 && isDay === 1) {
        //partially cloudy day
        return "partially-cloudy-day-bg-img";
      } else if (code === 1003 && isDay === 0) {
        //partially cloudy night
        return "partially-cloudy-night-bg-img";
      } else if (
        (code === 1006 ||
          code === 1009 ||
          code === 1030 ||
          code === 1135 ||
          code === 1147) &&
        isDay === 1
      ) {
        //cloudy day
        return "cloudy-day-bg-img";
      } else if (
        (code === 1006 ||
          code === 1009 ||
          code === 1030 ||
          code === 1135 ||
          code === 1147) &&
        isDay === 0
      ) {
        //cloudy night
        return "cloudy-night-bg-img";
      } else if (
        (code === 1063 ||
          code === 1069 ||
          code === 1072 ||
          code === 1150 ||
          code === 1153 ||
          code === 1168 ||
          code === 1171 ||
          code === 1180 ||
          code === 1183 ||
          code === 1186 ||
          code === 1189 ||
          code === 1192 ||
          code === 1195 ||
          code === 1198 ||
          code === 1201 ||
          code === 1204 ||
          code === 1207 ||
          code === 1240 ||
          code === 1243 ||
          code === 1246 ||
          code === 1249 ||
          code === 1252) &&
        isDay === 1
      ) {
        //rainy day
        return "rainy-day-bg-img";
      } else if (
        (code === 1063 ||
          code === 1069 ||
          code === 1072 ||
          code === 1150 ||
          code === 1153 ||
          code === 1168 ||
          code === 1171 ||
          code === 1180 ||
          code === 1183 ||
          code === 1186 ||
          code === 1189 ||
          code === 1192 ||
          code === 1195 ||
          code === 1198 ||
          code === 1201 ||
          code === 1204 ||
          code === 1207 ||
          code === 1240 ||
          code === 1243 ||
          code === 1246 ||
          code === 1249 ||
          code === 1252) &&
        isDay === 0
      ) {
        //rainy night
        return "rainy-night-bg-img";
      } else if (
        (code === 1066 ||
          code === 1114 ||
          code === 1117 ||
          code === 1210 ||
          code === 1213 ||
          code === 1216 ||
          code === 1219 ||
          code === 1222 ||
          code === 1225 ||
          code === 1237 ||
          code === 1255 ||
          code === 1258 ||
          code === 1261 ||
          code === 1264) &&
        isDay === 1
      ) {
        //snowy day
        return "snowy-day-bg-img";
      } else if (
        (code === 1066 ||
          code === 1114 ||
          code === 1117 ||
          code === 1210 ||
          code === 1213 ||
          code === 1216 ||
          code === 1219 ||
          code === 1222 ||
          code === 1225 ||
          code === 1237 ||
          code === 1255 ||
          code === 1258 ||
          code === 1261 ||
          code === 1264) &&
        isDay === 0
      ) {
        //snowy night
        return "snowy-night-bg-img";
      } else if (
        (code === 1087 ||
          code === 1273 ||
          code === 1276 ||
          code === 1279 ||
          code === 1282) &&
        isDay === 1
      ) {
        //thundery day
        return "lightning-day-bg-img";
      } else if (
        (code === 1087 ||
          code === 1273 ||
          code === 1276 ||
          code === 1279 ||
          code === 1282) &&
        isDay === 0
      ) {
        //thundery night
        return "lightning-night-bg-img";
      } else {
        return "default-background";
      }
    };

    // Apply the determined background class to the body element
    const body = document.querySelector("body");
    if (body) {
      body.className = determineBackgroundClass();
    }
  }, [code, isDay]);

  //---------------------

  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleInputChange = (e) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      const currentDataURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

      fetch(currentDataURL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch current weather data");
          }
        })
        .then((currentData) => {
          setMessage("");
          console.log(currentData);
          setCurrentWeatherData(currentData);
        })
        .catch((error) => {
          console.error(error);
          setMessage("Enter a valid city");
        });

      const forecastedDataURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=8`;

      fetch(forecastedDataURL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch current weather data");
          }
        })
        .then((forecastedData) => {
          setMessage("");
          console.log(forecastedData);
          setForecastedWeatherData(forecastedData);
        })
        .catch((error) => {
          console.error(error);
          setMessage("Enter a valid city");
        });
    }, 1000);

    setTypingTimeout(timeout);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="div-text-container">
        <form onSubmit={onSubmit}>
          <div
            className={`message-container ${
              message.length > 0 ? "visible" : ""
            }`}
          >
            <h3>{message}</h3>
          </div>
          <div className="div-textForm">
            <input
              id="location-textbox"
              autoComplete="off"
              type="text"
              placeholder="Type a city..."
              value={location}
              onChange={onChangeLocation}
              onInput={handleInputChange}
              className="input-text"
            />
          </div>
        </form>
      </div>

      <DisplayWeatherData
        currentData={currentWeatherData}
        forecastedData={forecastedWeatherData}
      />
    </>
  );
};
