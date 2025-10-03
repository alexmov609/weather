import { useState, useEffect } from "react";
import { getMultipleCitiesData } from "../services/openWeatherMap";
import type { City, MeteoResponseDefaultCity } from "../types/weather";

export const useWeatherData = (initialCities: City[]) => {
  const [weatherData, setWeatherData] = useState<
    Array<MeteoResponseDefaultCity>
  >([]);

  // Fetch weather data for default cities on mount
  useEffect(() => {
    const fetchDefaultCities = async () => {
      const result = await getMultipleCitiesData(initialCities);

      if (result.success) {
        setWeatherData(result.data!);
      }
    };

    fetchDefaultCities();
  }, []);

  // Add a new city to weather data
  const addCity = (cityData: MeteoResponseDefaultCity) => {
    setWeatherData((prev) => [cityData, ...prev]);
  };

  const removeCity = (cityName: string) => {
    setWeatherData((prev) => prev.filter(city => city.city !== cityName))
  }

  return {
    weatherData,
    addCity,
    removeCity,
  };
};
