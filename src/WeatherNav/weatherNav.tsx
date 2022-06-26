export const WeatherNav = () => {
  return (
    <div className="text-gray-800">
      <nav className="w-full bg-sky-700 flex justify-between px-16">
        <div className="flex-1"></div>
        <h2 className="font-paytone self-center text-4xl tracking-wide">
          What the Weather?
        </h2>
        <form className="p-3 m-2 flex-1 text-right">
          <input
            id="city-search"
            placeholder="Search weather by city..."
            type="text"
            className="p-2 rounded-l-lg"
          />
          <button className="bg-sky-400 py-2 px-4 rounded-r-lg hover:bg-sky-500">
            Search
          </button>
        </form>
      </nav>
    </div>
  );
};

export default WeatherNav;
