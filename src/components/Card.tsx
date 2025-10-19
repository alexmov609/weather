import { useState, useEffect } from "react";
import {
  getWeatherDescription,
  getWeatherCategory,
  isValidWeatherCode,
} from "../data/wheatherCodes";
import {
  ChevronDown,
  ChevronUp,
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
import type { DailyFormatted } from "../types/weather";
import { weekDays } from "../data/common";
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
  daily: DailyFormatted[];
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
        onClick={() => setShowInfo(true)}
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
          {/* Animated Weather Particles */}
          {data.weatherCode !== null && (
            <>
              {/* Rain particles */}
              {(getWeatherCategory(data.weatherCode) === "rain" ||
                getWeatherCategory(data.weatherCode) === "drizzle") && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 bg-white/30"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}%`,
                        height: `${Math.random() * 30 + 20}px`,
                        animation: `fall ${
                          Math.random() * 0.5 + 0.5
                        }s linear infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Snow particles */}
              {getWeatherCategory(data.weatherCode) === "snow" && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full opacity-80"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}%`,
                        animation: `snowfall ${
                          Math.random() * 3 + 2
                        }s linear infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Cloud particles */}
              {getWeatherCategory(data.weatherCode) === "cloudy" && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-32 h-16 bg-white/10 rounded-full blur-xl"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 50}%`,
                        animation: `float ${
                          Math.random() * 10 + 15
                        }s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Thunderstorm particles */}
              {getWeatherCategory(data.weatherCode) === "thunderstorm" && (
                <>
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 bg-white/40"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `-${Math.random() * 20}%`,
                          height: `${Math.random() * 40 + 30}px`,
                          animation: `fall ${
                            Math.random() * 0.3 + 0.3
                          }s linear infinite`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute inset-0 bg-white/20"
                      style={{
                        animation: "lightning 5s infinite",
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}

          <style>{`
            @keyframes fall {
              to {
                transform: translateY(100vh);
              }
            }
            @keyframes snowfall {
              to {
                transform: translateY(100vh) translateX(50px);
              }
            }
            @keyframes float {
              0%, 100% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(100px);
              }
            }
            @keyframes lightning {
              0%, 100% {
                opacity: 0;
              }
              45%, 55% {
                opacity: 0;
              }
              49%, 51% {
                opacity: 1;
              }
            }
          `}</style>

          <div className="min-h-screen w-full p-8 relative z-10">
            <button
              onClick={() => setShowInfo(false)}
              className="fixed top-1 right-6 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors hover:cursor-pointer"
            >
              <X size={12} className="text-white" />
            </button>
            <div className="w-full mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-5">
                <div className="text-6xl font-bold text-white mb-4">
                  {data.city}
                </div>
                <div className="text-6xl text-white/90">
                  {data.temperature! > 0 && "+"}
                  {Math.round(data.temperature ?? 0)}°C
                </div>
              </div>
              <div className="font-semibold text-4xl text-white/90 mb-6">
                {weekDays[new Date(data.daily[0].date).getDay()]}
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

              <div className="mt-5">
                <h3 className="text-3xl font-semibold text-white mb-3">
                  7-Day Forecast
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                  {data.daily.map((dailyData, index) => {
                    const weatherCategory = getWeatherCategory(
                      dailyData.weather
                    );
                    const iconPath = `/images/wheather/${weatherCategory}-day.svg`;

                    return (
                      <div
                        key={index}
                        className="bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-2xl p-5 text-center transition-all duration-300 hover:scale-105 border border-white/20"
                      >
                        <h4 className="text-white text-lg font-semibold mb-3">
                          {weekDays[new Date(dailyData.date).getDay()]}
                        </h4>

                        <img
                          src={iconPath}
                          alt={getWeatherDescription(dailyData.weather)}
                          className="w-16 h-16 mx-auto mb-3"
                        />

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-center gap-2 text-white">
                            <ChevronUp size={18} className="text-red-300" />
                            <span className="text-xl font-bold">
                              {Math.round(dailyData.maxTemperature)}°
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-white/80">
                            <ChevronDown size={18} className="text-blue-300" />
                            <span className="text-lg">
                              {Math.round(dailyData.minTemperature)}°
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-white/20 pt-3 space-y-2">
                          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                            <Wind size={14} />
                            <span>{Math.round(dailyData.windSpeed)} km/h</span>
                          </div>
                          <p className="text-white/60 text-xs leading-tight">
                            {getWeatherDescription(dailyData.weather)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
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
