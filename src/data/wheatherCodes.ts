import type { WeatherCondition } from "../types/weather";


export const WEATHER_CODES: Record<number, WeatherCondition> = {
    0: { code: 0, description: 'Clear sky', category: 'clear' },
    1: { code: 1, description: 'Mainly clear', category: 'clear' },
    2: { code: 2, description: 'Partly cloudy', category: 'cloudy' },
    3: { code: 3, description: 'Overcast', category: 'cloudy' },
    45: { code: 45, description: 'Fog', category: 'fog' },
    48: { code: 48, description: 'Fog', category: 'fog' },
    51: { code: 51, description: 'Drizzle', category: 'drizzle' },
    53: { code: 53, description: 'Drizzle', category: 'drizzle' },
    55: { code: 55, description: 'Drizzle', category: 'drizzle' },
    56: { code: 56, description: 'Freezing Drizzle', category: 'drizzle' },
    57: { code: 57, description: 'Freezing Drizzle', category: 'drizzle' },
    61: { code: 61, description: 'Rain', category: 'rain' },
    63: { code: 63, description: 'Rain', category: 'rain' },
    65: { code: 65, description: 'Rain', category: 'rain' },
    66: { code: 66, description: 'Freezing Rain', category: 'rain' },
    67: { code: 67, description: 'Freezing Rain', category: 'rain' },
    71: { code: 71, description: 'Snow fall', category: 'snow' },
    73: { code: 73, description: 'Snow fall', category: 'snow' },
    75: { code: 75, description: 'Snow fall', category: 'snow' },
    77: { code: 77, description: 'Snow grains', category: 'snow' },
    80: { code: 80, description: 'Rain showers', category: 'rain' },
    81: { code: 81, description: 'Rain showers', category: 'rain' },
    82: { code: 82, description: 'Rain showers', category: 'rain' },
    85: { code: 85, description: 'Snow showers', category: 'snow' },
    86: { code: 86, description: 'Snow showers', category: 'snow' },
    95: { code: 95, description: 'Thunderstorm', category: 'thunderstorm' },
    96: { code: 96, description: 'Thunderstorm', category: 'thunderstorm' },
    99: { code: 99, description: 'Thunderstorm', category: 'thunderstorm' }
} as const;

// Helper functions
export const getWeatherDescription = (code: number): string => {
    return WEATHER_CODES[code]?.description || 'Unknown weather condition';
};

export const getWeatherCategory = (code: number): string => {
    return WEATHER_CODES[code]?.category || 'unknown';
};

export const isValidWeatherCode = (code: number): code is keyof typeof WEATHER_CODES => {
    return code in WEATHER_CODES;
};

// Type for weather code keys
export type WeatherCode = keyof typeof WEATHER_CODES;