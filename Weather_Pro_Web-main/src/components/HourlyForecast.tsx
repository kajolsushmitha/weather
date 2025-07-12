import { ForecastData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface Props {
  forecast: ForecastData;
}

export default function HourlyForecast({ forecast }: Props) {
  const next24Hours = forecast.list.slice(0, 8); // API returns data in 3-hour intervals

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex space-x-4 min-w-max">
        {next24Hours.map((hour, index) => {
          const time = new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
          });

          return (
            <div
              key={hour.dt}
              className="flex flex-col items-center bg-white/5 backdrop-blur-lg rounded-xl p-4 min-w-[100px]"
            >
              <span className="text-white/80 text-sm mb-2">{time}</span>
              <WeatherIcon code={hour.weather[0].icon} size={40} className="mb-2" />
              <span className="text-white font-bold">{Math.round(hour.main.temp)}°C</span>
              <span className="text-white/60 text-sm">{hour.main.humidity}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}