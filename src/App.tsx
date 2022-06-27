import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherBlock } from "./WeatherBlock";
import { WeatherNav } from "./WeatherNav";

function App() {
  return (
    <Router>
      <div className="App flex flex-col h-screen">
        <WeatherNav />
        <header className="bg-slate-200 h-full flex justify-center">
          <div className="w-2/3 bg-white flex flex-col justify-center">
            <div className="w-2/3 mx-auto">
              <Routes>
                <Route path="" element={<WeatherBlock />} />
                <Route path="city/:cityName/*" element={<WeatherBlock />} />
                <Route path="*" element="404" />
              </Routes>
            </div>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;

