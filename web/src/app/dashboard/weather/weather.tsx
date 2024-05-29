import axios from "axios";

type WeatherDataResponse = {
  weatherId: string;
  label: string;
  title: string;
};

export async function getWeatherResponse(): Promise<WeatherDataResponse | null> {
  try {
    const response = await axios.get(`http://localhost:34962/api/weather`);
    return response.data;
  } catch (error) {
    return null;
  }
}