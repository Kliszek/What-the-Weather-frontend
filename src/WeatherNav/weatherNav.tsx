import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SunIcon } from "../svg/sun-fill.svg";

export const WeatherNav = () => {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedCityName = cityName.trim();
    setCityName(trimmedCityName);
    if (trimmedCityName) navigate(`/city/${trimmedCityName}`);
    else navigate("/");
  };

  return (
    <div className="text-gray-800 shadow-lg shadow-slate-300 z-10 */">
      <nav className="w-full bg-sky-600 pb-2 md:pb-0 flex flex-col md:flex-row justify-between md:px-16">
        <div className="xl:flex-1"></div>
        <Link
          to="/"
          className="font-paytone text-white self-center text-4xl tracking-wide py-4 text-center"
        >
          <SunIcon
            className="inline mr-4 -translate-y-2"
            style={{ color: "rgb(239,198,70)" }}
          />
          What the Weather?
        </Link>
        <form
          onSubmit={handleSubmit}
          className="p-3 flex-1 flex md:justify-end m-auto"
        >
          <input
            id="city-search"
            placeholder="Search weather by city..."
            type="search"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
            className="p-2 _rounded-l-lg"
          />
          <button className="bg-sky-400 py-2 px-4 _rounded-r-lg hover:bg-sky-500">
            Search
          </button>
        </form>
      </nav>
    </div>
  );
};

export default WeatherNav;
