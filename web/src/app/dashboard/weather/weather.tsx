import axios from "axios";
import api from "../../../utils/axios/axios.config";

type WeatherDataResponse = {
  weatherId: string;
  label: string;
  title: string;
};

export async function getWeatherResponse(): Promise<WeatherDataResponse | null> {
  try {
    const response = await axios.get(`http://localhost:34962/api/weather`);
    const response2 = await api.post(
        `/recruitment`,
        `{
        "name": "フロントからtest2",
        "owner": "d39c9cdb-759c-479e-94c7-2ddc0a3044e8",
        "genres": ["ROCK", "ANIME"],
        "songTitle": "title",
        "artist": "artist",
        "ownerInstruments": ["VOCAL", "ELECTRIC_BASE"],
        "recruitedInstruments": {"VOCAL": 1},
        "requiredGenerations": ["TEEN", "TWENTIES"],
        "requiredGender": "MALE_ONLY",
        "deadline": "2024-07-08T00:00:00+09:00",
        "memo": "memo"
      }`
      )
    ;
    return response.data;
  } catch (error) {
    return null;
  }
}