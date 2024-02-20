import React, { useState, useEffect } from "react";
import "../styling/DisplayWeatherData.css";
import { format } from "date-fns";

export const DisplayWeatherData = ({ currentData, forecastedData }) => {
  //currentData
  const [cityName, setCityName] = useState("");
  const [regionName, setRegionName] = useState("");
  const [country, setCountry] = useState("");
  const [weatherConditions, setWeatherConditions] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [timeZoneID, setTimeZoneID] = useState("");

  const [currentDate, setCurrentDate] = useState("");

  //forecastedData
  //used for later today
  const [forecastedWeatherLaterTodayTEXT, setForecastedWeatherLaterTodayTEXT] =
    useState([]);
  const [forecastedWeatherLaterTodayIMG, setForecastedWeatherLaterTodayIMG] =
    useState([]);
  const [forecastedWeatherLaterTodayHOUR, setForecastedWeatherLaterTodayHOUR] =
    useState([]);

  //used for the next 7 days
  const [forecastedWeatherText, setForecastedWeatherText] = useState([]);
  const [forecastedWeatherImg, setForecastedWeatherImg] = useState([]);
  const [forecastedWeatherDate, setforecastedWeatherDate] = useState([]);
  const [forecastedWeatherDayDate, setforecastedWeatherDayDate] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (currentData) {
      setCityName(currentData.location.name);
      setRegionName(currentData.location.region);
      setCountry(currentData.location.country);
      setWeatherConditions(currentData.current.condition.text);
      setTemperature(currentData.current.temp_c);
      setHumidity(currentData.current.humidity);
      setWindSpeed(currentData.current.wind_kph);
      const windDirection = HandleWindDirection(currentData);
      setWindDirection(windDirection);
      setTimeZoneID(currentData.location.tz_id);
      const currentDate = getCurrentDate(currentData.location.tz_id);
      setCurrentDate(currentDate);
    }
  }, [currentData]);

  const convertToDayOfWeek = (dateString, timeZoneID) => {
    const date = new Date(dateString);
    date.toLocaleString("en-US", { timeZone: timeZoneID });

    return format(date, "EEEE");
  };

  useEffect(() => {
    if (forecastedData) {
      //-------------------today
      const todaysForecastedConditionsTXT =
        forecastedData.forecast.forecastday[0].hour
          .filter((hour, index) => index % 4 === 0)
          .map((hour) => hour.condition.text);
      setForecastedWeatherLaterTodayTEXT(todaysForecastedConditionsTXT);

      const todaysForecastedConditionsIMG =
        forecastedData.forecast.forecastday[0].hour
          .filter((hour, index) => index % 4 === 0)
          .map((hour) => hour.condition.icon);
      setForecastedWeatherLaterTodayIMG(todaysForecastedConditionsIMG);

      const todaysForecastedConditionsHOUR =
        forecastedData.forecast.forecastday[0].hour
          .filter((hour, index) => index % 4 === 0)
          .map((hour) => hour.time);
      setForecastedWeatherLaterTodayHOUR(todaysForecastedConditionsHOUR);

      //--------------------next 7 days
      const forecastData = forecastedData.forecast.forecastday
        .slice(1, 8)
        .map((day) => day.day.condition.text);
      setForecastedWeatherText(forecastData);

      const forecastIconsData = forecastedData.forecast.forecastday
        .slice(1, 8)
        .map((day) => day.day.condition.icon);
      setForecastedWeatherImg(forecastIconsData);

      const forecastDateData = forecastedData.forecast.forecastday
        .slice(1, 8)
        .map((day) => day.date);
      setforecastedWeatherDate(forecastDateData);

      const forecastDayDateData = forecastedData.forecast.forecastday
        .slice(1, 8)
        .map((day) => {
          const dayOfWeek = convertToDayOfWeek(day.date, timeZoneID);
          return dayOfWeek;
        });
      setforecastedWeatherDayDate(forecastDayDateData);
    }
  }, [forecastedData]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const RealTimeClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      if (timeZoneID) {
        const intervalId = setInterval(() => {
          const newTime = new Date().toLocaleString("en-US", {
            timeZone: timeZoneID,
          });
          setCurrentTime(new Date(newTime));
        }, 1000);

        return () => clearInterval(intervalId);
      }
    }, [timeZoneID]);

    if (!timeZoneID) {
      return null;
    }

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    return <h1>{formattedTime}</h1>;
  };

  const getCurrentDate = (timeZoneID) => {
    const currentDate = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: timeZoneID,
    };
    return currentDate.toLocaleDateString("en-US", options);
  };

  const HandleWindDirection = (currentData) => {
    const wind_dir = currentData.current.wind_dir;
    if (wind_dir === "N") {
      return "North";
    } else if (wind_dir === "NbE") {
      return "North by East";
    } else if (wind_dir === "NNE") {
      return "North-Northeast";
    } else if (wind_dir === "NEbN") {
      return "Northeast by North";
    } else if (wind_dir === "NE") {
      return "Northeast";
    } else if (wind_dir === "NEbE") {
      return "Northeast by East";
    } else if (wind_dir === "ENE") {
      return "East-Northeast";
    } else if (wind_dir === "EbN") {
      return "East by North";
    } else if (wind_dir === "E") {
      return "East";
    } else if (wind_dir === "EbS") {
      return "East by South";
    } else if (wind_dir === "ESE") {
      return "East-Southeast	";
    } else if (wind_dir === "SEbE") {
      return "Southeast by East	";
    } else if (wind_dir === "SE") {
      return "Southeast";
    } else if (wind_dir === "SEbS") {
      return "Southeast by South	";
    } else if (wind_dir === "SSE") {
      return "South-Southeast	";
    } else if (wind_dir === "SbE") {
      return "South by East";
    } else if (wind_dir === "S") {
      return "South";
    } else if (wind_dir === "SbW") {
      return "South by West	";
    } else if (wind_dir === "SSW") {
      return "South-Southwest	";
    } else if (wind_dir === "SWbS") {
      return "Southwest by South";
    } else if (wind_dir === "SW") {
      return "Southwest";
    } else if (wind_dir === "SWbW") {
      return "Southwest by West";
    } else if (wind_dir === "WSW") {
      return "West-Southwest";
    } else if (wind_dir === "WbS") {
      return "West by South";
    } else if (wind_dir === "W") {
      return "West";
    } else if (wind_dir === "WbN") {
      return "West by North";
    } else if (wind_dir === "WNW") {
      return "West-Northwest";
    } else if (wind_dir === "NWbW") {
      return "Northwest by West";
    } else if (wind_dir === "NW") {
      return "Northwest";
    } else if (wind_dir === "NWbN") {
      return "Northwest by North";
    } else if (wind_dir === "NNW") {
      return "North-Northwest";
    } else if (wind_dir === "NbW") {
      return "North by West";
    } else {
      return "Error occurred";
    }
  };

  return (
    <>
      {cityName.length > 0 && (
        <>
          <h2>
            {cityName}
            {regionName.length > 0 && regionName != cityName && (
              <span>, {regionName}</span>
            )}
            {country.length > 0 && (
              <span>
                <br />
                {country}
              </span>
            )}
          </h2>
          <RealTimeClock />
          <div className="div-current-date">
            <p>{currentDate}</p>
          </div>
          <h3>Current Weather Conditions</h3>
          <div className="gray-box">
            {currentData && currentData.current.condition && (
              <img
                src={currentData.current.condition.icon}
                alt="Weather Icon"
              />
            )}
            <div className="div-current-conds-title">
              <h4>{weatherConditions}</h4>
            </div>
          </div>
          <div className="dropdown-header" onClick={toggleDropdown}>
            <span>Click to see the weather conditions for the whole day</span>
            <span
              className={`arrow-icon ${isDropdownOpen ? "up" : "down"}`}
            ></span>
          </div>
          <div className={`dropdown-content ${isDropdownOpen ? "open" : ""}`}>
            <div className="forecasted-weather-container">
              {forecastedWeatherLaterTodayTEXT.map(
                (forecastedTodaysWeatherTextConditions, index) => (
                  <div key={index} className="forecasted-weather-group">
                    <div className="dropdown-box">
                      <span>{forecastedWeatherLaterTodayHOUR[index]}</span>

                      <span>
                        <img
                          src={forecastedWeatherLaterTodayIMG[index]}
                          alt="Weather Icon"
                        />
                      </span>
                      <span>{forecastedTodaysWeatherTextConditions}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="info-container">
            {cityName.length > 0 && (
              <div className="sub-info-container">
                <div className="sub-info-box">
                  <span>
                    <strong>Temperature:</strong> {temperature}°C
                  </span>
                </div>
                <div className="sub-info-box">
                  <span>
                    <strong>Humidity:</strong> {humidity}
                  </span>
                </div>
                <div className="sub-info-box">
                  <span>
                    <strong>Wind Speed:</strong> {windSpeed} kph
                  </span>
                </div>
                <div className="sub-info-box">
                  <span>
                    <strong>Wind Direction:</strong> {windDirection}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="forecast-container">
            <div className="div-forecast-title">
              {cityName.length > 0 && <h2>Forecast for tomorrow</h2>}
            </div>

            <div className="forecasted-weather-container">
              <div className="forecasted-weather-group">
                <span>
                  <img src={forecastedWeatherImg[0]} alt="Weather Icon" />
                </span>
                <span>{forecastedWeatherText[0]}</span>
                <span>{forecastedWeatherDayDate[0]}</span>
                <span>{forecastedWeatherDate[0]}</span>
              </div>
              {/* {forecastedWeatherText.map(
                (forecastedWeatherTextConditions, index) => (
                  <div key={index} className="forecasted-weather-group">
                    <span>
                      <img
                        src={forecastedWeatherImg[index]}
                        alt="Weather Icon"
                      />
                    </span>
                    <span>{forecastedWeatherTextConditions}</span>
                    <span>{forecastedWeatherDayDate[index]}</span>
                    <span>{forecastedWeatherDate[index]}</span>
                  </div>
                )
              )} */}
            </div>
          </div>
        </>
      )}
    </>
  );
};
