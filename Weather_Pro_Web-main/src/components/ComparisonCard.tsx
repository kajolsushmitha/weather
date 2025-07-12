import { Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface Props {
  weather: WeatherData;
}

export default function ComparisonCard({ weather }: Props) {
  return (
    <div className="text-white">
      <div className="flex flex-col items-center mb-6">
        <WeatherIcon code={weather.weather[0].icon} size={64} className="mb-4" />
        <h2 className="text-2xl font-bold mb-1">{Math.round(weather.main.temp)}°C</h2>
        <p className="text-lg capitalize mb-1">{weather.weather[0].description}</p>
        <p className="text-sm opacity-80">Feels like {Math.round(weather.main.feels_like)}°C</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3">
          <Wind className="w-5 h-5 text-blue-300 mb-2" />
          <p className="text-xs text-white/60">Wind Speed</p>
          <p className="text-sm font-medium">{weather.wind.speed} m/s</p>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <Droplets className="w-5 h-5 text-blue-400 mb-2" />
          <p className="text-xs text-white/60">Humidity</p>
          <p className="text-sm font-medium">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <Eye className="w-5 h-5 text-gray-300 mb-2" />
          <p className="text-xs text-white/60">Visibility</p>
          <p className="text-sm font-medium">{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <Gauge className="w-5 h-5 text-indigo-300 mb-2" />
          <p className="text-xs text-white/60">Pressure</p>
          <p className="text-sm font-medium">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}