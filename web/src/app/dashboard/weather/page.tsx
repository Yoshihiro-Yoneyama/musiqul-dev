import WeatherComponent from "@/app/dashboard/weather/weather-component";
import React from "react";
import {getWeatherResponse} from "@/app/dashboard/weather/weather";

export default async function Page() {
  const initialResponse = await getWeatherResponse();
  return (
    <div>
      <WeatherComponent initialResponse={initialResponse} />
    </div>
  );
}
