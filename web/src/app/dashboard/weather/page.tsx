import {getWeatherResponse} from "@/app/dashboard/weather/weather";

export default async function Page() {
  const response = await getWeatherResponse();
  if (!response) {
    return <div>データ取得エラー</div>;
  }
  return (
    <>
      <h1>Weather Data</h1>
      <div>Weather ID: {response.weatherId}</div>
      <div>Label: {response.label}</div>
      <div>Title: {response.title}</div>
    </>
  );
}



