import { useState, useRef } from 'react';
import { Search, MapPin, Loader2, Mic } from 'lucide-react';
import { WeatherData, ForecastData } from '../types/weather';
import WeatherDetails from '../components/WeatherDetails';
import HourlyForecast from '../components/HourlyForecast';
import WeeklyForecast from '../components/WeeklyForecast';
import ForecastTabs from '../components/ForecastTabs';

type ForecastTab = 'current' | 'hourly' | 'weekly';

export default function Forecast() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState<ForecastTab>('current');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const API_KEY = '24eda372ca98c1a40cde6e83fa7cd3b5';

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      // Fetch forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

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
      await fetchWeather(lat, lon);
    } catch (err) {
      setError('Failed to fetch location data');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice recognition is not supported in your browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      if (searchInputRef.current) {
        searchInputRef.current.value = transcript;
      }
      setIsListening(false);
      setTimeout(() => {
        handleSearch(new Event('submit') as any);
      }, 500);
    };

    recognition.onerror = () => {
      setError('Error occurred in voice recognition');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather Forecast</h1>
          <p className="text-lg text-white/80">Enter a city name or use your current location</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a location..."
                className="w-full px-4 py-3 pl-10 rounded-xl bg-white/90 border-0 focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-700"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" />
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-3.5 p-1 rounded-full transition-colors ${
                  isListening ? 'text-red-500 bg-red-100' : 'text-gray-400 hover:text-blue-500'
                }`}
              >
                <Mic size={20} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleCurrentLocation}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
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

        {weather && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
            <div className="text-center text-white mb-4">
              <h2 className="text-3xl font-bold">{weather.name}</h2>
            </div>
            
            <ForecastTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="mt-6">
              {activeTab === 'current' && <WeatherDetails weather={weather} />}
              {activeTab === 'hourly' && forecast && <HourlyForecast forecast={forecast} />}
              {activeTab === 'weekly' && forecast && <WeeklyForecast forecast={forecast} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}