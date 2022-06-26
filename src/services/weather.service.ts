import axios from "axios";

const BACKEND_URL = "http://localhost:3000/v1/api/weather";

export default class WeatherService {
  static async getWeather() {
    return await axios.get(BACKEND_URL);
  }
}
