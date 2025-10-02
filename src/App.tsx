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
    <div className="min-h-screen bg-[url('/images/main.png')] bg-cover bg-no-repeat bg-center">
      <div className="w-full">
        <div className="flex flex-row align-center justify-center pt-5 mx-auto w-full">
          <div className="mt-6 flex items-center relative">
            <CitySearchForm addCity={addCity} />
          </div>
        </div>
        <div className="mt-5 flex flex-col justify-center items-center gap-5 min-h-[calc(100vh-200px)]">
          {rows.map((row, rowIndex) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
