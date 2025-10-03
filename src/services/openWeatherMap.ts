
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL
import type { City, CityWeatherData, DailyResponse, FormattedWeatherData, WeatherResponse } from "../types/weather";


/**
 * Fetch current weather data from open-meteo API 
 * https://open-meteo.com/en/docs
 */
export const getMultipleCitiesData = async (cities: City[]) => {
    try {
        //create strings for all Longtitude and latitude from App.tsx
        const lats = cities.map(city => city.latitude).join(',');
        const lons = cities.map(city => city.longitude).join(',');

        const params = {
            latitude: lats,
            longitude: lons,
            forecast_days: 7,
            current: [
                'temperature_2m',
                'relative_humidity_2m',
                'apparent_temperature',
                'is_day',
                'precipitation',
                'weather_code',
                'cloud_cover',
                'pressure_msl',
                'wind_speed_10m',
                'wind_direction_10m'
            ].join(','),
            daily: [
                'temperature_2m_max',
                'temperature_2m_min',
                'weather_code',
                'precipitation_sum',
                'wind_speed_10m_max'
            ].join(','),
            timezone: 'auto'
        };
        const response = await axios.get<WeatherResponse[]>(API_BASE_URL, { params });
        if (!response.data) {
            throw new Error('Invalid API response structure');
        }

        // Map each city with its corresponding weather data
        const newCities: CityWeatherData[] = cities.map((city, index) => ({
            city: city.name,
            ...formatWeatherData(response.data[index]) // Pass the specific weather object
        }));
        console.log("reee", newCities);
        return {
            success: true,
            data: newCities
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred when fetching data';
        return {
            success: false,
            error: errorMessage
        };
    }
}

/**
 * Get searched city data
 * @param city 
 * @returns 
 */
export const getNewCityData = async (city: City) => {
    try {
        const params = {
            latitude: city.latitude,
            longitude: city.longitude,
            current: [
                'temperature_2m',
                'relative_humidity_2m',
                'apparent_temperature',
                'is_day',
                'precipitation',
                'weather_code',
                'cloud_cover',
                'pressure_msl',
                'wind_speed_10m',
                'wind_direction_10m'
            ].join(','),
            daily: [
                'temperature_2m_max',
                'temperature_2m_min',
                'weather_code',
                'precipitation_sum',
                'wind_speed_10m_max'
            ].join(','),
            timezone: 'auto'
        };
        const response = await axios.get<WeatherResponse>(API_BASE_URL, { params });
        if (!response.data) {
            throw new Error('Invalid API response structure');
        }

        // Create correct city object
        const newCities: CityWeatherData = {
            city: city.name,
            ...formatWeatherData(response.data!) // Pass the specific weather object
        };



        return {
            success: true,
            data: newCities
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred when fetching data';
        return {
            success: false,
            error: errorMessage
        };
    }
}


/**
 * Format data from Open Weather response
 * @param data 
 * @returns 
 */
const formatWeatherData = (weatherData: WeatherResponse, index = 0): FormattedWeatherData => {

    if (!weatherData) {
        throw new Error('Invalid data structure in formatWeatherData');
    }

    const current = weatherData.current;
    const getValue = (value: string | number | null) => {
        if (value === undefined || value === null) return null;
        return Array.isArray(value) ? value[index] : value;
    };

    const dailyData = (data: DailyResponse) => {
        const formattedData = []
        for (let i = 0; i < data.time.length; i++) {
            formattedData.push({
                'date': data.time[i],
                'minTemperature': data.temperature_2m_min[i],
                'maxTemperature': data.temperature_2m_max[i],
                'weather': data.weather_code[i],
                'windSpeed': data.wind_speed_10m_max[i],
            })
        }

        return formattedData;
    }

    return {
        temperature: getValue(current.temperature_2m),
        feelsLike: getValue(current.apparent_temperature),
        humidity: getValue(current.relative_humidity_2m),
        precipitation: getValue(current.precipitation),
        windSpeed: getValue(current.wind_speed_10m),
        windDirection: getValue(current.wind_direction_10m),
        pressure: getValue(current.pressure_msl),
        cloudCover: getValue(current.cloud_cover),
        isDay: getValue(current.is_day) === 1,
        weatherCode: getValue(current.weather_code),
        timestamp: getValue(current.time),
        daily: dailyData(weatherData.daily)
    }
};
