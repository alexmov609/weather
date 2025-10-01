//Default cities
export interface City {
    name: string;
    latitude: number;
    longitude: number;
}

//Search select city data
export interface CityData extends City {
    country: string;
}

//Json cities interface
export interface JsonCityData {
    name: string;
    lng: string;
    lat: string;
    country: string;
    admin1: string;
    admin2: string;
}

//Response from meteo Api
export interface MeteoResponseDefaultCity {
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

export type Inputs = {
    cityToSearch: string;
};

export interface WeatherUnits {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    precipitation: string;
    weather_code: string;
    cloud_cover: string;
    pressure_msl: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
}

interface CurrentWeather {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
}

export interface WeatherResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    location_id?: number;
    current_units: WeatherUnits;
    current: CurrentWeather;
}

export interface FormattedWeatherData {
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

export interface CityWeatherData extends FormattedWeatherData {
    city: string;
}
export interface WeatherCondition {
    code: number;
    description: string;
    category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
}