import { useState, useEffect, useCallback } from "react";
import citiesData from "cities.json";
import { getNewCityData } from "../services/openWeatherMap";
import type { CityData, JsonCityData, CityWeatherData } from "../types/weather";

export const useCitySearch = () => {
  const [cityToSearch, setCityToSearch] = useState<string>("");
  const [cityToSearchObject, setCityToSearchObject] =
    useState<CityWeatherData | null>(null);
  const [allCities, setAllCities] = useState<CityData[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Filter cities based on search value
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

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCityToSearch(value);
      filterCities(value);
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

    console.log("city to searchObject11", result.data!);

    if (result.success && result.data!) {
      setCityToSearchObject(result.data!);
    }
  }, []);

  // Reset search
  const resetSearch = useCallback(() => {
    setCityToSearch("");
    setCityToSearchObject(null);
  }, []);

  // Close suggestions
  const closeSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  return {
    cityToSearch,
    cityToSearchObject,
    filteredCities,
    showSuggestions,
    handleInputChange,
    selectCity,
    resetSearch,
    closeSuggestions,
  };
};
