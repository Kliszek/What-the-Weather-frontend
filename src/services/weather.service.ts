import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export default class WeatherService {
  static async getWeather(cityName: string | undefined, options: object = {}) {
    const requestURL = `${BACKEND_URL}//v1/api/weather/${
      cityName ? cityName : ""
    }`;
    return axios.get(requestURL, options);
  }
}
