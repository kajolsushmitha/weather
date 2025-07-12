import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import HistoricalComparison from '../components/HistoricalComparison';

export default function Historical() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState<{
    coord: { lat: number; lon: number };
    main: { temp: number };
  } | null>(null);

  const API_KEY = '24eda372ca98c1a40cde6e83fa7cd3b5';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();
      
      if (geoData.length === 0) {
        setError('Location not found');
        return;
      }

      const { lat, lon } = geoData[0];
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
    } catch (err) {
      setError('Failed to fetch location data');
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true);
            const { latitude: lat, longitude: lon } = position.coords;
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            setWeatherData(data);
          } catch (err) {
            setError('Failed to fetch weather data');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Historical Weather Data</h1>
          <p className="text-lg text-white/80">Compare current weather with historical data</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a location..."
                className="w-full px-4 py-3 pl-10 rounded-xl bg-white/90 border-0 focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-700"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={handleCurrentLocation}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin size={20} />
              Use Current Location
            </button>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center my-12">
            <Loader2 className="animate-spin text-white" size={40} />
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/20 text-white px-4 py-3 rounded-xl mb-8">
            {error}
          </div>
        )}

        {weatherData && (
          <HistoricalComparison
            lat={weatherData.coord.lat}
            lon={weatherData.coord.lon}
            currentTemp={weatherData.main.temp}
          />
        )}
      </div>
    </div>
  );
}