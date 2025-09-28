import { useEffect, useState } from "react";
import Card from "./components/Card";
import { getMultipleCitiesData } from "./services/openWeatherMap";

interface City {
  name: string;
  latitude: number;
  longitude: number;
}
const myCities: Array<City> = [
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Budapest", latitude: 47.4979, longitude: 19.0402 },
  { name: "Moscow", latitude: 55.7558, longitude: 37.6176 },
  { name: "Oslo", latitude: 59.9139, longitude: 10.7522 },
  { name: "Copenhagen", latitude: 55.6761, longitude: 12.5683 },
  { name: "Vienna", latitude: 48.2082, longitude: 16.3738 },
  { name: "Barcelona", latitude: 41.3851, longitude: 2.1734 },
  // { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
];

interface DefaultCity {
  city: string;
  temperature: number | null;
  feelsLike: number | null;
  humidity: number | null;
  precipitation: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  pressure: number | null;
  cloudCover: number | null;
  isDay: boolean;
  weatherCode: number | null;
  timestamp: string | null;
}

function App() {
  const [defaultCities, setDefaultCities] = useState<Array<DefaultCity>>([]);

  useEffect(() => {
    const fetchDefaultCities = async () => {
      const result = await getMultipleCitiesData(myCities);

      if (result.success) {
        setDefaultCities(result.data!);
      }
    };
    fetchDefaultCities();
  }, []);

  return (
    <div className="min-h-screen bg-[url('/images/main.png')] bg-cover bg-no-repeat bg-center">
      <div className="w-full">
        <div className="flex flex-row align-center justify-center pt-5 mx-auto w-full">
          <div className="mt-6 flex min-w-lg gap-x-4">
            <input
              id="search"
              type="text"
              name="search"
              required
              placeholder="Enter your city"
              className="flex-auto rounded-xl bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center flex-wrap gap-5 min-h-[calc(100vh-200px)]">
          {defaultCities.map((cityData, ind) => (
            <Card key={ind} data={cityData} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
