import Card from "./components/Card";
import { useWeatherData } from "./hooks/useWeatherData";
import CitySearchForm from "./components/CitySearchForm";
import { myCities } from "./data/defaultCities";

function App() {
  const { weatherData, addCity } = useWeatherData(myCities);

  return (
    <div className="min-h-screen bg-[url('/images/main.png')] bg-cover bg-no-repeat bg-center">
      <div className="w-full">
        <div className="flex flex-row align-center justify-center pt-5 mx-auto w-full">
          <div className="mt-6 flex items-center relative">
            <CitySearchForm addCity={addCity} />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center flex-wrap gap-5 min-h-[calc(100vh-200px)]">
          {weatherData.map((cityData, ind) => (
            <Card key={ind} data={cityData} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
