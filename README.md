# Weather App 🌤️

A beautiful, interactive weather application built with React and TypeScript that provides real-time weather information for cities around the world.

![Weather App](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## ✨ Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **7-Day Forecast**: View detailed weather predictions for the week ahead
- **Interactive City Cards**: Hover effects and expandable weather details
- **Animated Weather Effects**: Dynamic particles based on weather conditions (rain, snow, clouds, thunderstorms)
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Smart Grid Layout**: Automatically organizes cities in optimal rows (3-5 cards per row)
- **Weather Icons**: Beautiful SVG icons representing different weather conditions
- **Detailed Weather Info**:
  - Temperature (current and feels like)
  - Humidity
  - Wind speed and direction
  - Atmospheric pressure
  - Cloud cover
  - Precipitation

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/alexmov609/weather.git
cd weather
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 18** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Open-Meteo API** - Weather data provider
- **Lucide React** - Icon library

## 📁 Project Structure

```
weather/
├── public/
│   └── images/
│       ├── wheather/          # Weather condition icons
│       ├── dailyWeather/      # Daily forecast icons
│       └── main.png           # Background image
├── src/
│   ├── components/
│   │   ├── Card.tsx           # Weather card component
│   │   └── CitySearchForm.tsx # City search component
│   ├── data/
│   │   ├── common.ts          # Common data (week days)
│   │   ├── defaultCities.ts   # Default cities list
│   │   └── wheatherCodes.ts   # Weather code mappings
│   ├── hooks/
│   │   ├── useCitySearch.ts   # City search hook
│   │   └── useWeatherData.ts  # Weather data hook
│   ├── services/
│   │   └── openWeatherMap.ts  # API service
│   ├── types/
│   │   └── weather.ts         # TypeScript interfaces
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point
└── README.md
```

## 🎨 Features in Detail

### Weather Animations

The app includes immersive weather animations that activate in the detailed view modal:

- **Rain/Drizzle**: Animated falling rain drops
- **Snow**: Gently falling snowflakes with drift
- **Cloudy**: Floating cloud formations
- **Thunderstorm**: Heavy rain with lightning effects

### Smart City Grid

Cities are automatically arranged in rows based on the total count:

- Optimizes for 4 or 5 cards per row
- Avoids single orphan cards
- Responsive layout for different screen sizes

### Mobile Optimization

- Cards display in expanded state on mobile devices
- Touch-friendly interactions
- Optimized grid layout for small screens

## 🔧 Configuration

### Default Cities

You can modify the default cities in `src/data/defaultCities.ts`:

```typescript
export const myCities: Array<City> = [
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  // Add more cities...
];
```

### Weather Codes

Weather conditions are mapped in `src/data/wheatherCodes.ts`. You can customize descriptions and categories as needed.

## 📱 Usage

1. **Add a City**: Use the search bar at the top to find and add cities
2. **View Details**: Click the info icon on any city card to see detailed weather information
3. **Remove a City**: Click the trash icon to remove a city from your list
4. **7-Day Forecast**: Open the detailed view to see the week's weather prediction

## 👤 Author

**Alex Movchan**

- GitHub: [@alexmov609](https://github.com/alexmov609)

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo API](https://open-meteo.com/)
- Icons from [Lucide](https://lucide.dev/)

---

© 2025 All rights reserved by Alex Movchan
