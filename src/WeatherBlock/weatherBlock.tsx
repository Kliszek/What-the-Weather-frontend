import { ReactComponent as SunriseIcon } from "../svg/sunrise.svg";
import { ReactComponent as SunsetIcon } from "../svg/sunset.svg";
import { ReactComponent as HumidityIcon } from "../svg/droplet.svg";
import { ReactComponent as WindIcon } from "../svg/wind.svg";
import { ReactComponent as PressureIcon } from "../svg/arrow-up.svg";
import { ReactComponent as SunIcon } from "../svg/sun-fill.svg";
import { useEffect, useState } from "react";
import WeatherService from "../services/weather.service";
import { WeatherResponse } from "../services/weather-response.interface";
import "../animations/loading-spinner.css";
import "../animations/fade-in.css";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";

const ICON_URL = "http://openweathermap.org/img/wn/";

const getHourAndMinutes = (unixInSeconds: number) =>
  new Date(unixInSeconds * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const windDegToCompass = (deg: number) => {
  const index: number = Math.round(deg / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[index];
};

export const WeatherBlock = () => {
  const { cityName } = useParams();

  const [weather, setWeather] = useState<null | WeatherResponse>(null);
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    const abortCont = new AbortController();

    setIsPending(true);
    setError(null);
    setWeather(null);
    console.log("asdasdga");
    WeatherService.getWeather(cityName)
      .then((result) => {
        setWeather(result.data);
        setIsPending(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setIsPending(false);
        if (error.response?.status === 404) {
          setError("Specified city was not found!");
        } else {
          setError(`Error: ${error.message}`);
        }
      });

    return () => abortCont.abort();
  }, [cityName]);

  return (
    <div className="font-mono text-center text-white">
      <h3 className="text-4xl text-black mb-5">Weather for today:</h3>
      {error && <div className="text-black">{error}</div>}
      {isPending && (
        <div className="spinner mx-auto">
          <SunIcon />
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
      {weather && (
        <div className="bg-sky-600 p-6 _rounded-lg shadow-lg shadow-slate-600 grid grid-cols-3 gap-3 text-lg fade-in">
          <div className="col-span-1 text-left px-6 border-sky-700 border-r-2 border-opacity-30">
            <h2 className="text-4xl font-semibold mb-7">{weather.name}</h2>
            <p>
              {new Date(weather.dt * 1000).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="mb-3">
              {new Date(weather.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>
            <p className="mb-4">
              {new Date(weather.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div>
              <h3 className="text-5xl">{weather.main.temp.toFixed()}°C</h3>
              <p>Feels like: {weather.main.feels_like.toFixed()}°C</p>
            </div>
          </div>
          <div className="col-span-1 px-3">
            <div className="p-2 _rounded-lg bg-white bg-opacity-10 mb-2 h-2/3">
              <img
                className="mx-auto"
                src={`${ICON_URL}${weather.weather[0].icon}@4x.png`}
                alt=""
              />
            </div>
            <p className="first-letter:uppercase text-2xl">
              {weather.weather[0].description}
            </p>
          </div>
          <div className="col-span-1 text-left px-6 border-sky-700 border-l-2 border-opacity-30">
            <div className="ml-3 mt-6 text-xl space-y-3">
              <p title="Sunrise">
                <SunriseIcon className="inline mr-4" />
                {getHourAndMinutes(weather.sys.sunrise)}
              </p>
              <p title="Sunset">
                <SunsetIcon className="inline mr-4" />
                {getHourAndMinutes(weather.sys.sunset)}
              </p>
              <p title="Humidity">
                <HumidityIcon className="inline mr-4" />
                {weather.main.humidity}%
              </p>
              <p title="Wind">
                <WindIcon className="inline mr-4" />
                {weather.wind.speed.toFixed()} m/s,{" "}
                {windDegToCompass(weather.wind.deg)}
              </p>
              <p title="Pressure">
                <PressureIcon className="inline mr-4" />
                {weather.main.pressure} hPa
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherBlock;
