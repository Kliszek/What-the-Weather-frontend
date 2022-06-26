import React from "react";
import { WeatherBlock } from "./WeatherBlock";
import { WeatherNav } from "./WeatherNav";

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <WeatherNav />
      <header className="bg-slate-200 h-full flex justify-center">
        <div className="w-2/3 bg-white flex flex-col justify-center">
          <div className="w-2/3 mx-auto">
            <WeatherBlock />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

