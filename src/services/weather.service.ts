import axios from "axios";

const BACKEND_URL = "http://localhost:3000/v1/api/weather";

export default class WeatherService {
  static async getWeather(cityName: string | undefined, options: object = {}) {
    const requestURL = `${BACKEND_URL}/${cityName ? cityName : ""}`;
    return axios.get(requestURL, options);
  }
}
