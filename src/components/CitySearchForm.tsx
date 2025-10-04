import { useEffect, useRef } from "react";
import { useCitySearch } from "../hooks/useCitySearch";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Inputs, MeteoResponseDefaultCity } from "../types/weather";

interface CitySearchFormProps {
  addCity: (cityData: MeteoResponseDefaultCity) => void;
}

const CitySearchForm = ({ addCity }: CitySearchFormProps) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const {
    cityToSearch,
    cityToSearchObject,
    filteredCities,
    showSuggestions,
    handleInputChange,
    selectCity,
    resetSearch,
    closeSuggestions,
  } = useCitySearch();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        closeSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSuggestions]);

  // Add to the card and display the searched city data
  const onSubmit: SubmitHandler<Inputs> = () => {
    if (cityToSearchObject) {
      addCity(cityToSearchObject);
      resetSearch();
      searchContainerRef.current = null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center sm:flex-row align-item-center justify-content-center relative">
        <div className="relative" ref={searchContainerRef}>
          <input
            value={cityToSearch}
            onChange={handleInputChange}
            placeholder="Search for a city..."
            className="w-70 flex-auto rounded-xl bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          {showSuggestions && filteredCities.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50 mt-1">
              {filteredCities.map((city, index) => (
                <div
                  key={`${city.name}-${city.country}-${index}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => selectCity(city)}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {city.name}
                  </div>
                  <div className="text-xs text-gray-500">{city.country}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="flex-none mt-3 sm:mt-0 rounded-md bg-indigo-500 ms-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Search
        </button>
      </div>
      {errors.cityToSearch && (
        <span className="ms-2 text-red-500">City name is required</span>
      )}
    </form>
  );
};

export default CitySearchForm;
