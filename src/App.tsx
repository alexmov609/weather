function App() {
  return (
    <div className="min-h-screen  bg-[url(./assets/images/main.png)] bg-cover bg-no-repeat bg-center">
      <div className=" w-full">
        <div className="flex flex-row align-center justify-center pt-5 mx-auto w-full">
          <div className="mt-6 flex min-w-lg gap-x-4">
            <input
              id="search"
              type="text"
              name="search"
              required
              placeholder="Enter your city"
              className="flex-auto rounded-xl bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Search
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-1xl font-bold text-red-600 text-center mb-4">
            Weather App
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
