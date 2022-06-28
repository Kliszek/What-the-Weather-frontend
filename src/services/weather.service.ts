import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

export default class WeatherService {
  static async getWeather(cityName: string | undefined, options: object = {}) {
    Object.assign(options, this._getCommonOptions());
    const requestURL = `${BACKEND_URL}/v1/api/weather/${
      cityName ? cityName : ""
    }`;
    return axios.get(requestURL, options);
  }

  static _getCommonOptions = () => ({
    data: {},
    headers: {
      "Access-Control-Allow-Origin": "https://what-the-weather-1.herokuapp.com",
      "Access-Control-Allow-Headers":
        "Accept, Content-Type, Origin, X-Requested-With, x-api-key",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
