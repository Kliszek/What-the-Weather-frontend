import { ReactComponent as SunriseIcon } from "../svg/sunrise.svg";
import { ReactComponent as SunsetIcon } from "../svg/sunset.svg";
import { ReactComponent as HumidityIcon } from "../svg/droplet.svg";
import { ReactComponent as WindIcon } from "../svg/wind.svg";
import { ReactComponent as PressureIcon } from "../svg/arrow-up.svg";

const mockedWeatherResponse = {
  coord: {
    lon: 20.9806,
    lat: 52.2169,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 24.47,
    feels_like: 24.15,
    temp_min: 22.89,
    temp_max: 26.06,
    pressure: 1011,
    humidity: 45,
  },
  visibility: 10000,
  wind: {
    speed: 2.68,
    deg: 87,
    gust: 3.13,
  },
  clouds: {
    all: 0,
  },
  dt: 1655394565,
  sys: {
    type: 2,
    id: 2040355,
    country: "PL",
    sunrise: 1655345656,
    sunset: 1655405957,
  },
  timezone: 7200,
  id: 756135,
  name: "Warsaw",
  cod: 200,
};

const weatherDate = new Date(mockedWeatherResponse.dt * 1000);
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
  return (
    <div className="font-mono text-center text-white">
      <h3 className="text-4xl text-black mb-5">Weather for today:</h3>
      <div className="bg-sky-600 p-6 _rounded-lg shadow-lg shadow-slate-600 grid grid-cols-3 gap-3 text-lg">
        <div className="col-span-1 text-left px-6 border-sky-700 border-r-2 border-opacity-30">
          <h2 className="text-4xl font-semibold mb-7">
            {mockedWeatherResponse.name}
          </h2>
          <p>
            {weatherDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
            })}
          </p>
          <p className="mb-3">
            {weatherDate.toLocaleDateString("en-US", { weekday: "long" })}
          </p>
          <p className="mb-4">
            {weatherDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div>
            <h3 className="text-5xl">
              {mockedWeatherResponse.main.temp.toFixed()}°C
            </h3>
            <p>
              Feels like: {mockedWeatherResponse.main.feels_like.toFixed()}°C
            </p>
          </div>
        </div>
        <div className="col-span-1 px-3">
          <div className="p-2 _rounded-lg bg-white bg-opacity-10 mb-2 h-2/3">
            <img
              className="mx-auto"
              src={`http://openweathermap.org/img/wn/${mockedWeatherResponse.weather[0].icon}@4x.png`}
              alt=""
            />
          </div>
          <p className="first-letter:uppercase text-2xl">
            {mockedWeatherResponse.weather[0].description}
          </p>
        </div>
        <div className="col-span-1 text-left px-6 border-sky-700 border-l-2 border-opacity-30">
          <div className="ml-3 mt-6 text-xl space-y-3">
            <p title="Sunrise">
              <SunriseIcon className="inline mr-4" />
              {getHourAndMinutes(mockedWeatherResponse.sys.sunrise)}
            </p>
            <p title="Sunset">
              <SunsetIcon className="inline mr-4" />
              {getHourAndMinutes(mockedWeatherResponse.sys.sunset)}
            </p>
            <p title="Humidity">
              <HumidityIcon className="inline mr-4" />
              {mockedWeatherResponse.main.humidity}%
            </p>
            <p title="Wind">
              <WindIcon className="inline mr-4" />
              {mockedWeatherResponse.wind.speed.toFixed()} m/s,{" "}
              {windDegToCompass(mockedWeatherResponse.wind.deg)}
            </p>
            <p title="Pressure">
              <PressureIcon className="inline mr-4" />
              {mockedWeatherResponse.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherBlock;
