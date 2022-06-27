import { ReactComponent as SunIcon } from "../svg/sun-fill.svg";

export const WeatherNav = () => {
  return (
    <div className="text-gray-800 shadow-lg shadow-slate-300 z-10 */">
      <nav className="w-full bg-sky-600 flex justify-between px-16">
        <div className="flex-1"></div>
        <h2 className="font-paytone text-white self-center text-4xl tracking-wide">
          <SunIcon
            className="inline mr-4 -translate-y-2"
            style={{ color: "rgb(239,198,70)" }}
          />
          What the Weather?
        </h2>
        <form className="p-3 m-2 flex-1 text-right">
          <input
            id="city-search"
            placeholder="Search weather by city..."
            type="text"
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
