import { useState, useEffect } from "react";
import {
  getWeatherDescription,
  getWeatherCategory,
  isValidWeatherCode,
} from "../data/wheatherCodes";
interface CityData {
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

const Card = ({ data }: { data: CityData }) => {
  const [iconSrc, setIconSrc] = useState<string>("");

  useEffect(() => {
    const loadWeatherIcon = () => {
      try {
        const weatherCategory = getWeatherCategory(data.weatherCode!);
        const timeOfDay = data.isDay ? "day" : "night";
        const iconFileName = `${weatherCategory}-${timeOfDay}.svg`;
        const iconPath = `/images/wheather/${iconFileName}`;

        setIconSrc(iconPath);
      } catch (error) {
        console.warn(`Could not load weather icon for ${data}:`, error);
        // Fallback to a default icon
        setIconSrc('/images/wheather/clear-day.svg');
      }
    };

    if (data.weatherCode) {
      loadWeatherIcon();
    }
  }, [data]);

  return (
    <div
      className={`duration-300 font-mono text-white group cursor-pointer relative overflow-hidden ${
        data.isDay ? "bg-[#7f8080]" : "bg-[#22272B]"
      } w-38 h-48 rounded-3xl p-4 hover:w-56 hover:bg-blue-200 hover:dark:bg-[#0C66E4]`}
    >
      <h3 className="text-xl text-center">{data.city}</h3>
      <div className="gap-4 relative">
        {iconSrc && <img src={iconSrc} className="w-25" alt="weather icon" />}
        <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-5xl text-center group-hover:translate-x-4 group-hover:-translate-y-20 group-hover:scale-110">
          {Math.round(data.temperature ?? 0)}°
        </h4>
      </div>
      <div className="absolute duration-300 -left-32 mt-2 group-hover:left-10">
        <p className="text-sm">
          {isValidWeatherCode(data.weatherCode!)
            ? getWeatherDescription(data.weatherCode!)
            : ""}
        </p>
        <p className="text-sm">{data.humidity}% humidity</p>
      </div>
    </div>
  );
};

export default Card;
