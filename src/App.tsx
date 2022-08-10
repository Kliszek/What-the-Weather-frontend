import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Error404 } from "./Errors";
import { Footer } from "./Footer";
import { HttpsRedirect } from "./HttpsRedirect";
import { WeatherBlock } from "./WeatherBlock";
import { WeatherNav } from "./WeatherNav";

function App() {
  return (
    <HttpsRedirect>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <WeatherNav />
          <header className="bg-slate-200 flex-grow h-full flex justify-center">
            <div className="w-full lg:w-4/5 xl:w-2/3 bg-white flex flex-col justify-center">
              <div className="w-full md:w-4/5 lg:w-4/5 xl:w-2/3 mx-auto">
                <Routes>
                  <Route path="" element={<WeatherBlock />} />
                  <Route path="city/:cityName/*" element={<WeatherBlock />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </div>
            </div>
          </header>
          <Footer />
        </div>
      </Router>
    </HttpsRedirect>
  );
}

export default App;

