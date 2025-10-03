import Card from "./components/Card";
import { useWeatherData } from "./hooks/useWeatherData";
import CitySearchForm from "./components/CitySearchForm";
import { myCities } from "./data/defaultCities";

const cardNumbersPerRow = (totalCards: number): number => {
  // For 9+ cards: try 4 or 5 per row, avoid single orphan
  for (const perRow of [5, 4]) {
    const remainder = totalCards % perRow;
    if (remainder === 0 || remainder >= 2) {
      return perRow;
    }
  }

  return 4;
};
function App() {
  const { weatherData, addCity, removeCity } = useWeatherData(myCities);
  const cardsPerRow = cardNumbersPerRow(weatherData.length);

  //Slice weatherData for rows in case it default cities array length
  const rows = [];
  if (weatherData.length > 8) {
    for (let i = 0; i < weatherData.length; i += cardsPerRow) {
      rows.push(weatherData.slice(i, i + cardsPerRow));
    }
  } else rows.push(weatherData);

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-[url('/images/main.png')] bg-cover bg-no-repeat bg-center blur-sm -z-10"></div>
      <div className="w-full relative">
        <div className="flex flex-row align-center justify-center pt-5 mx-auto w-full">
          <div className="mt-6 flex items-center relative">
            <CitySearchForm addCity={addCity} />
          </div>
        </div>
        <div className="mt-5 flex flex-col justify-center items-center gap-5 min-h-[calc(100vh-250px)]">
          {weatherData.length > 0 ? (
            rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-row justify-center items-center flex-wrap gap-5"
              >
                {row.map((cityData, ind) => (
                  <Card
                    key={rowIndex * cardsPerRow + ind}
                    data={cityData}
                    removeCity={removeCity}
                  />
                ))}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 mt-20">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                <svg
                  className="w-32 h-32 text-black/80 relative animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-black/90 text-xl font-light tracking-wide">
                Start exploring the weather
              </p>
              <p className="text-black/60 text-sm">
                Search for a city above to get started
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="relative mt-10 py-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-black text-sm">
              © {new Date().getFullYear()} All rights reserved by{" "}
              <a
                href="https://github.com/alexmov609/weather"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-blue-600 font-semibold transition-colors underline"
              >
                Alex Movchan
              </a>
            </p>
            <p className="text-black text-xs mt-2">
              Built with React & TypeScript
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
