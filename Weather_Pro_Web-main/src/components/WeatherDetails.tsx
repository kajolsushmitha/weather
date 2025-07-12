import { Sun, Moon, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import WeatherRecommendations from './WeatherRecommendations';
import HealthIndex from './HealthIndex';
import WeatherAnimation from './WeatherAnimation';

interface Props {
  weather: WeatherData;
}

export default function WeatherDetails({ weather }: Props) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMoonPhase = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const c = Math.floor(365.25 * year);
    const e = Math.floor(30.6 * month);
    const jd = c + e + day - 694039.09;
    const phase = jd / 29.53;
    return phase - Math.floor(phase);
  };

  const getMoonPhaseName = (phase: number) => {
    if (phase < 0.03 || phase > 0.97) return 'New Moon';
    if (phase < 0.23) return 'Waxing Crescent';
    if (phase < 0.27) return 'First Quarter';
    if (phase < 0.48) return 'Waxing Gibbous';
    if (phase < 0.52) return 'Full Moon';
    if (phase < 0.73) return 'Waning Gibbous';
    if (phase < 0.77) return 'Last Quarter';
    return 'Waning Crescent';
  };

  const moonPhase = getMoonPhase();
  const moonPhaseName = getMoonPhaseName(moonPhase);

  const currentTime = Math.floor(Date.now() / 1000);

  return (
    <div className="space-y-8">
      <div className="relative">
        <WeatherAnimation weatherType={weather.weather[0].main} />
        
        {/* Main Weather Display */}
        <div className="flex flex-col items-center justify-center text-white relative z-10">
          <WeatherIcon code={weather.weather[0].icon} size={96} className="mb-4" />
          <h2 className="text-6xl font-bold mb-2">{Math.round(weather.main.temp)}°C</h2>
          <p className="text-2xl font-medium capitalize mb-1">{weather.weather[0].description}</p>
          <p className="text-lg opacity-80">Feels like {Math.round(weather.main.feels_like)}°C</p>
        </div>
      </div>

      {/* Celestial Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Sun className="w-8 h-8 text-yellow-400 mr-3" />
            <h3 className="text-lg font-medium text-white">Sun Schedule</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/60 mb-1">Sunrise</p>
              <p className="text-lg font-medium text-white">{formatTime(weather.sys.sunrise)}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Sunset</p>
              <p className="text-lg font-medium text-white">{formatTime(weather.sys.sunset)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Moon className="w-8 h-8 text-blue-200 mr-3" />
            <h3 className="text-lg font-medium text-white">Moon Phase</h3>
          </div>
          <div>
            <p className="text-lg font-medium text-white mb-1">{moonPhaseName}</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-200 h-2 rounded-full" 
                style={{ width: `${moonPhase * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Wind className="w-6 h-6 text-blue-300 mb-2" />
          <p className="text-sm text-white/60">Wind Speed</p>
          <p className="text-lg font-medium text-white">{weather.wind.speed} m/s</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Droplets className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-sm text-white/60">Humidity</p>
          <p className="text-lg font-medium text-white">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Eye className="w-6 h-6 text-gray-300 mb-2" />
          <p className="text-sm text-white/60">Visibility</p>
          <p className="text-lg font-medium text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Gauge className="w-6 h-6 text-indigo-300 mb-2" />
          <p className="text-sm text-white/60">Pressure</p>
          <p className="text-lg font-medium text-white">{weather.main.pressure} hPa</p>
        </div>
      </div>

      {/* Health Index */}
      <HealthIndex
        temp={weather.main.temp}
        humidity={weather.main.humidity}
        visibility={weather.visibility}
        pressure={weather.main.pressure}
      />

      {/* Weather Recommendations */}
      <WeatherRecommendations
        temp={weather.main.temp}
        weatherMain={weather.weather[0].main}
        windSpeed={weather.wind.speed}
        time={currentTime}
      />
    </div>
  );
}