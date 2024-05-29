'use client';

import {useState} from 'react';
import {getWeatherResponse} from "@/app/dashboard/weather/weather";


type WeatherDataResponse = {
  weatherId: string;
  label: string;
  title: string;
};

type WeatherComponentProps = {
  initialResponse: WeatherDataResponse | null;
};

export default function WeatherComponent({initialResponse}: WeatherComponentProps) {
  const [weatherData, setWeatherData] = useState<WeatherDataResponse | null>(initialResponse);

  // ボタンクリックの通知を返す
  // ボタンのfunctionを受け取る

  const handleButtonClick = async () => {
    if (weatherData) {
      // データが表示されている場合、クリアする
      setWeatherData(null);
    } else {
      // データが表示されていない場合、データを取得する
      const response = await getWeatherResponse();
      setWeatherData(response);
    }
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <button onClick={handleButtonClick}>
        {weatherData ? (
          <>データクリア</>
        ) : (
          <>データ取得</>
        )}
      </button>
      {weatherData ? (
        <>
          <div>Weather ID: {weatherData.weatherId}</div>
          <div>Label: {weatherData.label}</div>
          <div>Title: {weatherData.title}</div>
        </>
      ) : (
        <div>データなし</div>
      )}
    </div>
  );
}
