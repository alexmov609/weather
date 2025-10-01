import { useEffect, useState, useCallback, useRef } from "react";
import Card from "./components/Card";
import {
  getMultipleCitiesData,
  getNewCityData,
} from "./services/openWeatherMap";
import { useForm, type SubmitHandler } from "react-hook-form";
import citiesData from "cities.json";
import { type CityWeatherData } from "./services/openWeatherMap";

//Default cities
interface City {
  name: string;
  latitude: number;
  longitude: number;
}

//Search select city data
interface CityData extends City {
  country: string;
}

//Json cities interface
interface JsonCityData {
  name: string;
  lng: string;
  lat: string;
  country: string;
  admin1: string;
  admin2: string;
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
  { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
];

//Response from meteo Api
interface MeteoResponseDefaultCity {
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

type Inputs = {
  cityToSearch: string;
};

function App() {
  const [defaultCities, setDefaultCities] = useState<
    Array<MeteoResponseDefaultCity>
  >([]);
  const [cityToSearch, setCityToSearch] = useState<string>("");
  const [cityToSearchObject, setCityToSearchObject] =
    useState<CityWeatherData | null>(null);
  const [allCities, setAllCities] = useState<CityData[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  //fetch all default cities data
  useEffect(() => {
    const fetchDefaultCities = async () => {
      const result = await getMultipleCitiesData(myCities);

      if (result.success) {
        setDefaultCities(result.data!);
      }
    };

    fetchDefaultCities();
  }, []);

  // Load cities data from cities.json
  useEffect(() => {
    const loadCities = () => {
      const cities: CityData[] = (citiesData as JsonCityData[]).map(
        (city: JsonCityData) => ({
          name: city.name,
          country: city.country,
          latitude: parseFloat(city.lat),
          longitude: parseFloat(city.lng),
        })
      );
      setAllCities(cities);
    };

    loadCities();
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Debounced filtering function
  const filterCities = useCallback(
    (searchValue: string) => {
      if (searchValue.length >= 2) {
        const filtered = allCities
          .filter((city) =>
            city.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .slice(0, 10); // Limit to 10 results
        setFilteredCities(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
        setFilteredCities([]);
      }
    },
    [allCities]
  );

  // Debounced input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCityToSearch(value);

      // Clear previous timeout and set new one for debouncing
      // const timeoutId = setTimeout(() => {
      filterCities(value);
      // }, 200);

      // return () => clearTimeout(timeoutId);
    },
    [filterCities]
  );

  // Handle city selection from dropdown
  const selectCity = useCallback(async (city: CityData) => {
    setCityToSearch(city.name);
    setShowSuggestions(false);
    setFilteredCities([]);

    // Fetch weather data for selected city
    const result = await getNewCityData({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    });

    if (result.success && result.data!) {
      setCityToSearchObject(result.data!);
    }
  }, []);

  //Add to the card and display the searched city data
  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log(cityToSearchObject);
    console.log(defaultCities[0]);

    // Add the new city to the displayed cities
    if (cityToSearchObject) {
      setDefaultCities((prev) => [...prev, { ...cityToSearchObject }]);
      setCityToSearch("");
      setCityToSearchObject(null);
      searchContainerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/main.png')] bg-cover bg-no-repeat bg-center">
      <div className="w-full">
        <div className="flex flex-row align-center justify-center pt-5 mx-auto w-full">
          <div className="mt-6 flex items-center relative">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row align-item-center justify-content-center relative">
                <div className="relative" ref={searchContainerRef}>
                  <input
                    value={cityToSearch}
                    onChange={handleInputChange}
                    placeholder="Search for a city..."
                    className="w-70 flex-auto rounded-xl bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  {showSuggestions && filteredCities.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50 mt-1">
                      {filteredCities.map((city, index) => (
                        <div
                          key={`${city.name}-${city.country}-${index}`}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => selectCity(city)}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {city.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {city.country}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 ms-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Search
                </button>
              </div>
              {errors.cityToSearch && (
                <span className="ms-2 text-red-500">City name is required</span>
              )}
            </form>
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
