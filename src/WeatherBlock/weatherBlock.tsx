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
    WeatherService.getWeather(cityName, { signal: abortCont.signal })
      .then((result) => {
        setWeather(result.data);
        setIsPending(false);
        setError(null);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        if (error.message === "canceled") return;
        setIsPending(false);
        if (error.response?.status === 404) {
          setError("city not found");
        } else if (error.response?.status === 429) {
          setError("too many requests");
        } else {
          setError(`Error: ${error.response?.statusText || error.message}`);
        }
      });

    return () => abortCont.abort();
  }, [cityName]);

  return (
    <div className="font-mono text-center text-white">
      <h3 className="text-4xl text-slate-800 my-5">Weather for today:</h3>
      {error && (
        <div className="bg-sky-600 p-5 py-10 text-2xl font-semibold text-white fade-in">
          {(error === "city not found" && (
            <div className="text-left px-7">
              <h2 className="text-5xl text-yellow-400 mb-4 inline-block border-b-2 border-white border-opacity-10">
                Oops!
              </h2>
              <p className="text-3xl">
                A city named{" "}
                <span className="text-3xl text-yellow-400 underline italic">
                  {cityName}
                </span>{" "}
                couldn't be found!
              </p>
              <br />
              <p className="text-xl text-yellow-100">
                Double check if you spelled it correctly!
              </p>
            </div>
          )) ||
            (error === "too many requests" && (
              <div className="text-left px-7">
                <h2 className="text-5xl text-yellow-400 mb-4 inline-block border-b-2 border-white border-opacity-10">
                  Oops!
                </h2>
                <p className="text-3xl">Too many requests!</p>
                <br />
                <p className="text-xl text-yellow-100">Slow down a little...</p>
              </div>
            )) ||
            "another error"}
        </div>
      )}
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
        <div className="bg-sky-600 p-6 _rounded-lg shadow-lg shadow-slate-600 grid sm:grid-cols-3 gap-3 text-lg cursor-default fade-in">
          <div className="col-span-1 text-left px-6 border-sky-700 border-r-2 border-opacity-30">
            <h2 className="text-3xl sm:text-4xl text-yellow-400 font-semibold mb-7 border-b-2 border-white border-opacity-10">
              {weather.name}
            </h2>
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
              <h3 className="text-4xl sm:text-5xl">
                {weather.main.temp.toFixed()}°C
              </h3>
              <p>Feels like: {weather.main.feels_like.toFixed()}°C</p>
            </div>
          </div>
          <div className="col-span-1 px-3">
            <div className="p-2 _rounded-lg bg-white bg-opacity-10 mb-2 h-2/3">
              <img
                className="mx-auto max-h-full"
                src={`${ICON_URL}${weather.weather[0].icon}@4x.png`}
                alt=""
              />
            </div>
            <p className="first-letter:uppercase text-2xl text-yellow-100">
              {weather.weather[0].description}
            </p>
          </div>
          <div className="col-span-1 text-left pl-6 border-sky-700 border-l-2 border-opacity-30">
            <div className="ml-3 mt-6 text-xl space-y-3">
              <p title="Sunrise" className="hover:text-yellow-100">
                <SunriseIcon className="inline mr-4" />
                {getHourAndMinutes(weather.sys.sunrise)}
              </p>
              <p title="Sunset" className="hover:text-yellow-100">
                <SunsetIcon className="inline mr-4" />
                {getHourAndMinutes(weather.sys.sunset)}
              </p>
              <p title="Humidity" className="hover:text-yellow-100">
                <HumidityIcon className="inline mr-4" />
                {weather.main.humidity}%
              </p>
              <p title="Wind" className="hover:text-yellow-100">
                <WindIcon className="inline mr-4" />
                {weather.wind.speed.toFixed()} m/s,{" "}
                {windDegToCompass(weather.wind.deg)}
              </p>
              <p title="Pressure" className="hover:text-yellow-100">
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
