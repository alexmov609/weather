import { useState, useEffect } from "react";
import {
  getWeatherDescription,
  getWeatherCategory,
  isValidWeatherCode,
} from "../data/wheatherCodes";
import {
  CircleGauge,
  Cloud,
  CloudRain,
  Droplet,
  Info,
  Thermometer,
  Trash2,
  Wind,
  X,
} from "lucide-react";
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

const Card = ({
  data,
  removeCity,
}: {
  data: CityData;
  removeCity: (name: string) => void;
}) => {
  const [iconSrc, setIconSrc] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        setIconSrc("/images/wheather/clear-day.svg");
      }
    };

    if (data.weatherCode !== null && data.weatherCode !== undefined) {
      loadWeatherIcon();
    }
  }, [data]);

  function getWindDirection(degrees: number): string {
    const directions = [
      "North",
      "Northeast",
      "East",
      "Southeast",
      "South",
      "Southwest",
      "West",
      "Northwest",
    ];
    const normalized = ((degrees % 360) + 360) % 360;
    const index = Math.round(normalized / 45) % 8;
    return directions[index];
  }
  return (
    <>
      <div
        className={`duration-300 font-mono text-white group cursor-pointer relative overflow-hidden ${
          data.isDay ? "bg-[#7f8080]" : "bg-[#22272B]"
        } ${
          isMobile ? "w-56" : "w-56 sm:w-38"
        } h-48 rounded-3xl p-4 hover:w-56 hover:bg-blue-200 hover:dark:bg-[#0C66E4]`}
      >
        <button
          onClick={() => setShowInfo(true)}
          className={`absolute top-3 left-3 p-2 rounded-lg ${
            isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          } hover:cursor-pointer transition-opacity duration-200`}
        >
          <Info size={16} />
        </button>
        <h3 className="text-xl text-center">{data.city}</h3>
        <button
          onClick={() => removeCity(data.city)}
          className={`absolute top-3 right-3 p-2 rounded-lg ${
            isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          } hover:cursor-pointer transition-opacity duration-200`}
        >
          <Trash2 size={16} />
        </button>
        <div className="gap-4 relative">
          {iconSrc && <img src={iconSrc} className="w-25" alt="weather icon" />}
          <h4
            className={`font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-5xl text-center ${
              isMobile
                ? "translate-x-4 -translate-y-20 scale-110"
                : "group-hover:translate-x-4 group-hover:-translate-y-20 group-hover:scale-110"
            }`}
          >
            {Math.round(data.temperature ?? 0)}°
          </h4>
        </div>
        <div
          className={`absolute duration-300 mt-2 ${
            isMobile ? "left-10" : "-left-32 group-hover:left-10"
          }`}
        >
          <p className="text-sm">
            {isValidWeatherCode(data.weatherCode!)
              ? getWeatherDescription(data.weatherCode!)
              : ""}
          </p>
          <p className="text-sm">{data.humidity}% humidity</p>
        </div>
      </div>

      {/* Full-Page Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-blue-800 z-50 overflow-auto">
          <div className="min-h-screen w-full p-8">
            <button
              onClick={() => setShowInfo(false)}
              className="fixed top-1 right-6 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors hover:cursor-pointer"
            >
              <X size={12} className="text-white" />
            </button>
            <div className="w-full mx-auto">
              <div className="flex flex-row justify-between mb-13">
                <div className="text-6xl font-bold text-white mb-4">
                  {data.city}
                </div>
                <div className="text-6xl text-white/90">
                  {data.temperature! > 0 && "+"}
                  {Math.round(data.temperature ?? 0)}°C
                </div>
              </div>
              <div className="font-semibold text-4xl text-white/90 mb-5">
                Monday
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <div className="text-2xl text-white/90 flex flex-row items-center mb-5 group/tooltip relative">
                    <Droplet className="cursor-help" />
                    <span className="absolute left-0 -top-8 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Humidity
                    </span>
                    <p className="ms-5">{data.humidity}%</p>
                  </div>
                  <div className="text-2xl text-white/90 flex flex-row items-center mb-5 group/tooltip relative">
                    <Wind className="cursor-help" />
                    <span className="absolute left-0 -top-8 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Wind
                    </span>
                    <p className="ms-5">
                      {getWindDirection(data.windDirection ?? 0)},{" "}
                      {data.windSpeed} km/h
                    </p>
                  </div>
                  <div className="text-2xl text-white/90 flex flex-row items-center mb-5 group/tooltip relative">
                    <CircleGauge className="cursor-help" />
                    <span className="absolute left-0 -top-8 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Pressure
                    </span>
                    <p className="ms-5">{data.pressure} hPa</p>
                  </div>
                </div>
                <div>
                  <div></div>
                  <div className="text-2xl text-white/90 flex flex-row items-center mb-5 group/tooltip relative">
                    <Thermometer className="cursor-help" />
                    <span className="absolute left-0 -top-8 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Feels Like
                    </span>
                    <p className="ms-5">{data.feelsLike}°C</p>
                  </div>
                  <div className="text-2xl text-white/90 flex flex-row items-center mb-5 group/tooltip relative">
                    <Cloud className="cursor-help" />
                    <span className="absolute left-0 -top-8 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Cloud Cover
                    </span>
                    <p className="ms-5">{data.cloudCover}%</p>
                  </div>
                  <div className="text-2xl text-white/90 flex flex-row items-center mb-5 group/tooltip relative">
                    <CloudRain className="cursor-help" />
                    <span className="absolute left-0 -top-8 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Precipitation
                    </span>
                    <p className="ms-5">{data.precipitation} mm</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-7 gap-6 mt-40">
                <div className="bg-white/20 text-white/70  backdrop-blur-md rounded-6xl p-6 rounded-xl text-center">
                  <h3 className=" text-3xl font-light uppercase tracking-wider mb-2">
                    SUN
                  </h3>
                  <p className="text-2xl ">
                    {Math.round(data.temperature ?? 0)}°C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
