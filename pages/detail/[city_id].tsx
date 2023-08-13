import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import cities from "@/lib/city.list.json";
import CityData from "@/interfaces/city";
import WeatherData from "@/interfaces/weather";

let Cities = cities as CityData[];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { city_id } = context.query;
  const apiKey = process.env.WEATHER_API_KEY;

  const city = Cities.find((city) => city.id.toString() == city_id);

  if (!city) {
    throw new Error("City not found");
  }
  

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${apiKey}&exclude=minutely&units=metric`;
  let weatherData: WeatherData;
  try {
    const res = await fetch(url);
    weatherData = await res.json();
    return {
      props: {
        city: city,
        weather: weatherData,
      },
    };
  } catch (e) {
    console.log("error fetching weather api", e);
    throw new Error("Weather data not found");
  }

}

type Props = {
  city: CityData;
  weather: WeatherData;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ city, weather }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;  
  return (
    <>
      <Head>
        <title>Weather Challenge</title>
      </Head>
      <main className="mt-5 mx-5">
        <h1 className="text-xl font-medium mb-4">Currently in {city.name}</h1>
        <Link href="/">&larr; Home</Link>
        <div className="py-5">
          <div className="bg-blue-500 rounded p-4">
            <div className="grid grid-cols-2">
              <div>
                <h2 className="text-2xl mb-4 text-white">
                  {city.name} ({city.country})
                </h2>
                <span className="font-medium text-lg text-white">
                  {weather.main.temp_max.toFixed(0)}&deg;C
                </span>
                &nbsp;
                <span className="text-gray-300 text-sm">
                  feels like - {weather.main.feels_like.toFixed(0)}&deg;C
                </span>
              </div>
              <div className="justify-self-end">
                <Image
                  src={iconUrl}
                  width={50}
                  height={50}
                  alt="Weather Icon"
                />
                <div className="text-white text-sm">
                  {weather.weather[0].main}
                </div>
                <div className="text-white text-sm">
                  {weather.weather[0].description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
