import { useState } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import WeatherIcon from '../components/WeatherIcon';
import type { WeatherData } from '../types/weather';

export default function Comparison() {
  const [cities, setCities] = useState<Array<{ name: string; weather: WeatherData | null }>>([
    { name: '', weather: null },
    { name: '', weather: null }
  ]);
  const [loading, setLoading] = useState<boolean[]>([false, false]);
  const [error, setError] = useState<string[]>(['', '']);

  const API_KEY = '24eda372ca98c1a40cde6e83fa7cd3b5';

  const fetchWeather = async (cityName: string, index: number) => {
    if (!cityName.trim()) return;

    try {
      setLoading(prev => prev.map((load, i) => i === index ? true : load));
      setError(prev => prev.map((err, i) => i === index ? '' : err));

      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        setError(prev => prev.map((err, i) => i === index ? 'City not found' : err));
        return;
      }

      const { lat, lon } = geoData[0];
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      setCities(prev => prev.map((city, i) => 
        i === index ? { ...city, weather: weatherData } : city
      ));
    } catch (err) {
      setError(prev => prev.map((err, i) => i === index ? 'Failed to fetch weather data' : err));
    } finally {
      setLoading(prev => prev.map((load, i) => i === index ? false : load));
    }
  };

  const handleSearch = (index: number) => {
    fetchWeather(cities[index].name, index);
  };

  const addCity = () => {
    if (cities.length < 4) {
      setCities(prev => [...prev, { name: '', weather: null }]);
      setLoading(prev => [...prev, false]);
      setError(prev => [...prev, '']);
    }
  };

  const removeCity = (index: number) => {
    if (cities.length > 2) {
      setCities(prev => prev.filter((_, i) => i !== index));
      setLoading(prev => prev.filter((_, i) => i !== index));
      setError(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Compare Weather</h1>
          <p className="text-lg text-white/80">Compare weather conditions between different cities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cities.map((city, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 relative">
              {cities.length > 2 && (
                <button
                  onClick={() => removeCity(index)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              )}
              
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={city.name}
                    onChange={(e) => setCities(prev => prev.map((c, i) => 
                      i === index ? { ...c, name: e.target.value } : c
                    ))}
                    placeholder="Enter city name"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/50"
                  />
                  <button
                    onClick={() => handleSearch(index)}
                    disabled={loading[index]}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    {loading[index] ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  </button>
                </div>
                {error[index] && (
                  <p className="text-red-300 text-sm mt-2">{error[index]}</p>
                )}
              </div>

              {city.weather && (
                <div className="text-white">
                  <div className="flex items-center justify-center mb-4">
                    <WeatherIcon code={city.weather.weather[0].icon} size={64} />
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold">{city.weather.name}</h3>
                    <p className="text-4xl font-bold mb-2">{Math.round(city.weather.main.temp)}°C</p>
                    <p className="text-lg capitalize">{city.weather.weather[0].description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/60">Humidity</p>
                      <p className="font-medium">{city.weather.main.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-white/60">Wind</p>
                      <p className="font-medium">{city.weather.wind.speed} m/s</p>
                    </div>
                    <div>
                      <p className="text-white/60">Pressure</p>
                      <p className="font-medium">{city.weather.main.pressure} hPa</p>
                    </div>
                    <div>
                      <p className="text-white/60">Feels Like</p>
                      <p className="font-medium">{Math.round(city.weather.main.feels_like)}°C</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {cities.length < 4 && (
            <button
              onClick={addCity}
              className="h-full min-h-[200px] border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              Add City
            </button>
          )}
        </div>
      </div>
    </div>
  );
}