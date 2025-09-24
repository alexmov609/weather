
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL


/**
 * Fetch current weather data from open-meteo API 
 * https://open-meteo.com/en/docs
 */
export const getDefaultData = async () => {
    const lon = '52.520007'
    const lat = '13.404954'

    try {
        const params = {
            latitude: lat,
            longitude: lon,
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
            timezone: 'auto'
        };
        const response = await axios.get(API_BASE_URL, { params });

        return {
            success: true,
            data: formatWeatherData(response.data)
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred when fetach data';
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
const formatWeatherData = (data: {
    current: {
        temperature_2m: string,
        apparent_temperature: string,
        relative_humidity_2m: string,
        precipitation: string,
        wind_speed_10m: string,
        wind_direction_10m: string,
        pressure_msl: string,
        cloud_cover: string,
        is_day: number,
        weather_code: number
        time: string
    }
}) => {
    const current = data.current;
    return {
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        precipitation: current.precipitation,
        windSpeed: current.wind_speed_10m,
        windDirection: current.wind_direction_10m,
        pressure: current.pressure_msl,
        cloudCover: current.cloud_cover,
        isDay: current.is_day === 1,
        weatherCode: current.weather_code,
        timestamp: current.time
    }
};